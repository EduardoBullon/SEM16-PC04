import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useNotificationContext } from "../../context/NotificationContext";
import { getTasks, deleteTask } from "../../services/task.service";

const TaskList = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useNotificationContext();

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    } else {
      loadTasks();
    }
  }, [token, user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      showError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta tarea?")) return;
    try {
      await deleteTask(id);
      showSuccess("Tarea eliminada correctamente");
      loadTasks();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
      showError("Error al eliminar la tarea");
    }
  };

  const isProfessor = user?.role === "PROFESSOR";

  const getStatusColor = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "var(--danger-color)"; // Vencida
    if (diffDays <= 3) return "var(--warning-color)"; // Próxima a vencer
    return "var(--success-color)"; // En tiempo
  };

  const getStatusText = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Vencida";
    if (diffDays <= 3) return "Próxima a vencer";
    return "En tiempo";
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ width: '40px', height: '40px', margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header de la página */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            📚 Mis Tareas
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem'
          }}>
            Gestiona y revisa todas tus actividades académicas
          </p>
        </div>
        
        {isProfessor && (
          <button
            className="btn-modern btn-primary-modern animate-pulse"
            onClick={() => navigate("/tasks/new")}
            style={{ fontSize: '1rem', padding: '1rem 2rem' }}
          >
            ✨ Crear Nueva Tarea
          </button>
        )}
      </div>

      {/* Estadísticas rápidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="modern-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
            {tasks.length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Total de Tareas</div>
        </div>
        
        <div className="modern-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-color)' }}>
            {tasks.filter(t => new Date(t.dueDate) > new Date()).length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>En Tiempo</div>
        </div>
        
        <div className="modern-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--warning-color)' }}>
            {tasks.filter(t => {
              const due = new Date(t.dueDate);
              const now = new Date();
              const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
              return diffDays <= 3 && diffDays >= 0;
            }).length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Próximas a Vencer</div>
        </div>
      </div>

      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <div className="modern-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            No hay tareas disponibles
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {isProfessor 
              ? "Crea tu primera tarea para comenzar a gestionar las actividades de tus estudiantes."
              : "No hay tareas asignadas en este momento."
            }
          </p>
          {isProfessor && (
            <button
              className="btn-modern btn-primary-modern"
              onClick={() => navigate("/tasks/new")}
            >
              🚀 Crear Primera Tarea
            </button>
          )}
        </div>
      ) : (
        <div className="grid-modern">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className="modern-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.3rem',
                  fontWeight: '600'
                }}>
                  {task.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getStatusColor(task.dueDate)
                  }}></div>
                  <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    {getStatusText(task.dueDate)}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                <p style={{
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {task.description}
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.25rem'
                    }}>
                      📅 Publicada
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}>
                      {new Date(task.publicationDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.25rem'
                    }}>
                      ⏰ Vence
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: getStatusColor(task.dueDate)
                    }}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    className="btn-modern btn-outline-modern"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    style={{ fontSize: '0.9rem' }}
                  >
                    👁️ Ver Detalle
                  </button>
                  
                  {isProfessor && (
                    <>
                      <button
                        className="btn-modern btn-outline-modern"
                        onClick={() => navigate(`/tasks/edit/${task.id}`)}
                        style={{ fontSize: '0.9rem' }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn-modern btn-danger-modern"
                        onClick={() => handleDelete(task.id)}
                        style={{ fontSize: '0.9rem' }}
                      >
                        🗑️ Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
