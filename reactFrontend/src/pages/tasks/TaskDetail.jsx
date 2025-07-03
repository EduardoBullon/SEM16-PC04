import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GradeForm from "../../components/GradeForm";
import { useAuthStore } from "../../store/authStore";
import { getTaskById } from "../../services/task.service";
import {
  createSubmission,
  updateSubmission,
  getSubmissionsByTask,
} from "../../services/submission.service";
import axiosInstance from "../../utils/axiosInstance";

function TaskDetail() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fileUrl: "",
    comments: "",
  });

  const isProfessor = user?.role === "TEACHER" || user?.role === "professor";
  const isStudent = user?.role === "STUDENT" || user?.role === "student";

  useEffect(() => {
    if (id && user) {
      loadTask();
      if (isProfessor) loadSubmissions();
      if (isStudent) loadMySubmission();
    }
  }, [id, user]);

  const loadTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(id);
      setTask(data);
    } catch (error) {
      console.error("Error al cargar tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissionsByTask(id);
      setAllSubmissions(data);
    } catch (error) {
      console.error("Error al cargar entregas:", error);
    }
  };

  const loadMySubmission = async () => {
    try {
      const res = await axiosInstance.get(`/submissions`);
      const my = res.data.find(
        (s) => s.task.id === Number(id) && s.user.id === user.id
      );
      if (my) {
        setSubmission(my);
        setForm({ fileUrl: my.fileUrl, comments: my.comments || "" });
        setHasSubmitted(true);
      } else {
        setSubmission(null);
        setHasSubmitted(false);
      }
    } catch (error) {
      console.error("Error al buscar entrega previa:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      submissionDate: new Date().toISOString(),
      status: "submitted",
      grade: null,
      userId: user.id,
      taskId: Number(id),
    };

    try {
      if (hasSubmitted && submission) {
        await updateSubmission(submission.id, payload);
        alert("Entrega actualizada");
      } else {
        await createSubmission(payload);
        alert("Entrega realizada");
      }
      await loadMySubmission();
    } catch (err) {
      console.error("Error al enviar entrega:", err);
      alert("Hubo un error al guardar la entrega.");
    }
  };

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
          <p style={{ color: 'var(--text-secondary)' }}>Cargando tarea...</p>
        </div>
      </div>
    );
  }

  if (!task) return null;

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
          📋 {task.title}
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getStatusColor(task.dueDate)
            }}></div>
            <span style={{ 
              fontSize: '0.9rem', 
              color: getStatusColor(task.dueDate),
              fontWeight: '500'
            }}>
              {getStatusText(task.dueDate)}
            </span>
          </div>
          <span style={{ color: 'var(--text-secondary)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Creada por {isProfessor ? 'tí' : 'el profesor'}
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Detalles de la tarea */}
        <div className="modern-card">
          <div className="card-header">
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>📄 Descripción</h3>
          </div>
          <div className="card-body">
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              {task.description}
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
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
          </div>
        </div>

        {/* Formulario de entrega (estudiante) */}
        {isStudent && (
          <div className="modern-card">
            <div className="card-header">
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                {hasSubmitted ? '✏️ Editar Entrega' : '📤 Realizar Entrega'}
              </h3>
            </div>
            <div className="card-body">
              {/* Mostrar estado y nota si ya hay entrega */}
              {submission && (
                <div style={{
                  padding: '1rem',
                  background: 'rgba(79, 70, 229, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(79, 70, 229, 0.2)',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                      Estado: {submission.status}
                    </span>
                    {submission.status === "graded" && (
                      <span style={{
                        background: 'var(--success-color)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        Nota: {submission.grade}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Entregado: {new Date(submission.submissionDate).toLocaleString()}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label-modern">
                    🔗 URL del Archivo
                  </label>
                  <input
                    type="url"
                    className="form-control-modern"
                    name="fileUrl"
                    value={form.fileUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://drive.google.com/file/..."
                    style={{ width: '100%' }}
                  />
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.25rem'
                  }}>
                    Sube tu archivo a Google Drive, Dropbox, etc. y pega el enlace aquí
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label-modern">
                    💬 Comentarios (opcional)
                  </label>
                  <textarea
                    className="form-control-modern"
                    name="comments"
                    rows="3"
                    value={form.comments}
                    onChange={handleChange}
                    placeholder="Agrega comentarios adicionales sobre tu entrega..."
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-modern btn-success-modern"
                  style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
                >
                  {hasSubmitted ? '💾 Actualizar Entrega' : '🚀 Enviar Entrega'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Lista de entregas (profesor) */}
        {isProfessor && (
          <div className="modern-card">
            <div className="card-header">
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                📝 Entregas de Estudiantes ({allSubmissions.length})
              </h3>
            </div>
            <div className="card-body">
              {allSubmissions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    No hay entregas aún. Los estudiantes podrán entregar cuando la tarea esté publicada.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {allSubmissions.map((s) => (
                    <div key={s.id} style={{
                      padding: '1rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.5rem'
                      }}>
                        <div>
                          <div style={{
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem'
                          }}>
                            👤 {s.user.firstName} {s.user.lastName}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)'
                          }}>
                            Entregado: {new Date(s.submissionDate).toLocaleString()}
                          </div>
                        </div>
                        <div style={{
                          background: s.status === 'graded' ? 'var(--success-color)' : 'var(--warning-color)',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {s.status === 'graded' ? `Nota: ${s.grade}` : 'Pendiente'}
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '0.5rem' }}>
                        <a
                          href={s.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--primary-color)',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                        >
                          📎 Ver archivo →
                        </a>
                      </div>
                      
                      {s.comments && (
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          fontStyle: 'italic'
                        }}>
                          💬 "{s.comments}"
                        </div>
                      )}
                      
                      {s.status !== 'graded' && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <GradeForm submissionId={s.id} onGrade={() => loadSubmissions()} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;
