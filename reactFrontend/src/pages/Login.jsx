import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser, token } = useAuthStore();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, user, message } = await login(form);
      setToken(token);
      setUser(user);
      
      if (message) {
        console.log("Login exitoso:", message);
      }
      
      navigate("/tasks");
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [token, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="form-modern animate-fade-in" style={{ maxWidth: '450px', width: '100%' }}>
        {/* Header del formulario */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem',
            color: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}>
            🎓
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Bienvenido
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem'
          }}>
            Inicia sesión en tu cuenta
          </p>
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <div className="alert-modern alert-danger-modern" style={{ marginBottom: '1.5rem' }}>
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
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label-modern">
              👤 Usuario
            </label>
            <input
              type="text"
              className="form-control-modern"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Ingresa tu nombre de usuario"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label-modern">
              🔒 Contraseña
            </label>
            <input
              type="password"
              className="form-control-modern"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Ingresa tu contraseña"
              style={{ width: '100%' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-modern btn-primary-modern"
            disabled={loading}
            style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div className="loading-spinner"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              <span>🚀 Iniciar Sesión</span>
            )}
          </button>
        </form>

        {/* Información de usuarios de prueba */}
        <div style={{
          marginTop: '2rem',
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
            💡 Usuarios de Prueba
          </h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div>👨‍💼 <strong>Admin:</strong> admin / admin</div>
            <div>👨‍🏫 <strong>Profesor:</strong> teacher / teacher</div>
            <div>👨‍🎓 <strong>Estudiante:</strong> student / student</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            © 2024 Academia Digital. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
