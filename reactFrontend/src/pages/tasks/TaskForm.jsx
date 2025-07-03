import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const [form, setForm] = useState({
    title: "",
    description: "",
    publicationDate: "",
    dueDate: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!user || (user.role !== "TEACHER" && user.role !== "professor")) {
      navigate("/tasks");
    }
  }, [user, navigate]);

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
          });
        })
        .catch((err) => {
          console.error("Error al cargar tarea:", err);
          navigate("/tasks");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...form,
      publicationDate: new Date(form.publicationDate),
      dueDate: new Date(form.dueDate),
    };

    try {
      if (isEdit) {
        await updateTask(id, payload);
      } else {
        await createTask(payload);
      }
      navigate("/tasks");
    } catch (err) {
      console.error("Error al guardar tarea:", err);
      setError("Ocurrió un error al guardar la tarea");
    } finally {
      setLoading(false);
    }
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
        {/* Mensaje de error */}
        {error && (
          <div className="alert-modern alert-danger-modern" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--danger-color)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                marginLeft: 'auto'
              }}
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

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
                />
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
                />
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Cuándo estará disponible para los estudiantes
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
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
                />
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Fecha límite para entregar la tarea
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
