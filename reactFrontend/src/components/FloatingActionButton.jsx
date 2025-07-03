import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isProfessor = user?.role === "PROFESSOR";

  if (!isProfessor) return null;

  return (
    <div
      onClick={() => navigate("/tasks/new")}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-xl)',
        fontSize: '1.5rem',
        color: 'white',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        animation: 'pulse 2s infinite'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 25px 50px -12px rgb(0 0 0 / 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'var(--shadow-xl)';
      }}
      title="Crear Nueva Tarea"
    >
      ✨
    </div>
  );
};

export default FloatingActionButton; 