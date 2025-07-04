import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";
import {
  createTask,
  getTaskById,
  updateTask,
} from "../../services/task.service";
import { useAuthStore } from "../../store/authStore";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { showSuccess, showError } = useNotificationContext();

  const [form, setForm] = useState({
    title: "",
    description: "",
    publicationDate: "",
    dueDate: "",
    status: "ACTIVE",
    maxGrade: 20.0,
  });

  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    // Validar que el usuario sea profesor
    if (!user || user.role !== "PROFESSOR") {
      showError("No tienes permisos para crear o editar tareas");
      navigate("/tasks");
      return;
    }
  }, [user, navigate, showError]);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getTaskById(id)
        .then((data) => {
          setForm({
            title: data.title,
            description: data.description,
            publicationDate: data.publicationDate.slice(0, 16),
            dueDate: data.dueDate.slice(0, 16),
            status: data.status || "ACTIVE",
            maxGrade: data.maxGrade || 20.0,
          });
        })
        .catch((err) => {
          console.error("Error al cargar tarea:", err);
          showError("Error al cargar la tarea para editar");
          navigate("/tasks");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEdit, navigate, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ 
      ...form, 
      [name]: name === 'maxGrade' ? parseFloat(value) || 0 : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar fechas
      const publicationDate = new Date(form.publicationDate);
      const dueDate = new Date(form.dueDate);
      const now = new Date();

      if (publicationDate < now) {
        showError("La fecha de publicación no puede ser anterior a la fecha actual");
        setLoading(false);
        return;
      }

      if (dueDate <= publicationDate) {
        showError("La fecha de vencimiento debe ser posterior a la fecha de publicación");
        setLoading(false);
        return;
      }

      // Validar nota máxima
      if (form.maxGrade < 0 || form.maxGrade > 20) {
        showError("La nota máxima debe estar entre 0 y 20");
        setLoading(false);
        return;
      }

      const payload = {
        ...form,
        publicationDate: publicationDate,
        dueDate: dueDate,
      };

      if (isEdit) {
        await updateTask(id, payload);
        showSuccess("Tarea actualizada correctamente");
      } else {
        await createTask(payload);
        showSuccess("Tarea creada correctamente");
      }
      
      // Navegar después de un breve delay para que se vea la notificación
      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
      
    } catch (err) {
      console.error("Error al guardar tarea:", err);
      const errorMessage = err.message || "Ocurrió un error al guardar la tarea";
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ width: '40px', height: '40px', margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Cargando tarea...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header de la página */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          {isEdit ? '✏️ Editar Tarea' : '✨ Crear Nueva Tarea'}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem'
        }}>
          {isEdit 
            ? 'Modifica los detalles de la tarea existente'
            : 'Define una nueva actividad para tus estudiantes'
          }
        </p>
      </div>

      <div className="form-modern">
        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Columna izquierda */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-modern">
                  📝 Título de la Tarea
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control-modern"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="Ej: Análisis de algoritmos de búsqueda"
                  style={{ width: '100%' }}
                  disabled={loading}
                />
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Máximo 200 caracteres
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-modern">
                  📄 Descripción
                </label>
                <textarea
                  name="description"
                  className="form-control-modern"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe detalladamente la tarea, requisitos y criterios de evaluación..."
                  style={{ 
                    width: '100%', 
                    minHeight: '120px',
                    resize: 'vertical'
                  }}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-modern">
                  🏆 Nota Máxima
                </label>
                <input
                  type="number"
                  name="maxGrade"
                  className="form-control-modern"
                  value={form.maxGrade}
                  onChange={handleChange}
                  required
                  min="0"
                  max="20"
                  step="0.1"
                  placeholder="20.0"
                  style={{ width: '100%' }}
                  disabled={loading}
                />
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Puntuación máxima de la tarea (0-20)
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-modern">
                  📅 Fecha de Publicación
                </label>
                <input
                  type="datetime-local"
                  name="publicationDate"
                  className="form-control-modern"
                  value={form.publicationDate}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                  disabled={loading}
                />
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Cuándo estará disponible para los estudiantes
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-modern">
                  ⏰ Fecha de Vencimiento
                </label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  className="form-control-modern"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                  disabled={loading}
                />
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Fecha límite para entregar la tarea
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label-modern">
                  📊 Estado de la Tarea
                </label>
                <select
                  name="status"
                  className="form-control-modern"
                  value={form.status}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  <option value="ACTIVE">🟢 Activa</option>
                  <option value="INACTIVE">🔴 Inactiva</option>
                  <option value="DRAFT">📝 Borrador</option>
                </select>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Estado actual de la tarea
                </div>
              </div>

              {/* Información adicional */}
              <div style={{
                padding: '1rem',
                background: 'rgba(79, 70, 229, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(79, 70, 229, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--primary-color)',
                  marginBottom: '0.5rem'
                }}>
                  💡 Consejos para una buena tarea
                </h4>
                <ul style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  paddingLeft: '1rem'
                }}>
                  <li>Usa un título claro y descriptivo</li>
                  <li>Incluye todos los requisitos necesarios</li>
                  <li>Establece fechas realistas</li>
                  <li>Especifica los criterios de evaluación</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <button 
              type="submit" 
              className="btn-modern btn-success-modern"
              disabled={loading}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="loading-spinner"></div>
                  <span>{isEdit ? 'Actualizando...' : 'Creando...'}</span>
                </div>
              ) : (
                <span>{isEdit ? '💾 Actualizar Tarea' : '🚀 Crear Tarea'}</span>
              )}
            </button>
            
            <button
              type="button"
              className="btn-modern btn-outline-modern"
              onClick={() => navigate("/tasks")}
              disabled={loading}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
