import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      ADMIN: "👨‍💼 Administrador",
      PROFESSOR: "👨‍🏫 Profesor",
      STUDENT: "👨‍🎓 Estudiante"
    };
    return roleNames[role] || role;
  };

  const getRoleColor = (role) => {
    const roleColors = {
      ADMIN: "var(--danger-color)",
      PROFESSOR: "var(--warning-color)",
      STUDENT: "var(--success-color)"
    };
    return roleColors[role] || "var(--text-secondary)";
  };

  const isProfessor = user?.role === "PROFESSOR";

  return (
    <nav className="modern-header">
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '70px'
      }}>
        <div 
          className="navbar-brand" 
          onClick={() => navigate("/")}
          style={{ cursor: 'pointer' }}
        >
          🎓 Academia Digital
        </div>
        
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Navegación principal */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className="btn-modern btn-outline-modern"
                onClick={() => navigate("/tasks")}
                style={{ fontSize: '0.9rem' }}
              >
                📚 Tareas
              </button>
              
              {/* Botón de Agregar Tarea para Profesores */}
              {isProfessor && (
                <button
                  className="btn-modern btn-primary-modern"
                  onClick={() => navigate("/tasks/new")}
                  style={{ fontSize: '0.9rem' }}
                >
                  ✨ Nueva Tarea
                </button>
              )}
              
              {user.role === "ADMIN" && (
                <button
                  className="btn-modern btn-outline-modern"
                  onClick={() => navigate("/users")}
                  style={{ fontSize: '0.9rem' }}
                >
                  👥 Usuarios
                </button>
              )}
              
              {isProfessor && (
                <button
                  className="btn-modern btn-outline-modern"
                  onClick={() => navigate("/submissions")}
                  style={{ fontSize: '0.9rem' }}
                >
                  📝 Entregas
                </button>
              )}
              
              <button
                className="btn-modern btn-outline-modern"
                onClick={() => navigate("/statistics")}
                style={{ fontSize: '0.9rem' }}
              >
                📊 Estadísticas
              </button>
            </div>
            
            {/* Perfil del usuario */}
            <div style={{ position: 'relative' }}>
              <div 
                onClick={toggleDropdown}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isDropdownOpen ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${getRoleColor(user.role)}, ${getRoleColor(user.role)}80)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}>
                    {user.username}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: getRoleColor(user.role),
                    fontWeight: '500'
                  }}>
                    {getRoleDisplayName(user.role)}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '2px',
                  marginLeft: '0.5rem',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--text-secondary)'
                  }}></div>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--text-secondary)'
                  }}></div>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--text-secondary)'
                  }}></div>
                </div>
              </div>
              
              {/* Menú desplegable */}
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '0.5rem',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.5rem',
                minWidth: '200px',
                zIndex: 1000,
                opacity: isDropdownOpen ? 1 : 0,
                visibility: isDropdownOpen ? 'visible' : 'hidden',
                transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'all 0.3s ease'
              }} className="dropdown-menu-modern">
                <button
                  className="dropdown-item-modern"
                  onClick={() => {
                    navigate("/profile");
                    setIsDropdownOpen(false);
                  }}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  👤 Mi Perfil
                </button>
                <hr style={{ 
                  margin: '0.5rem 0', 
                  border: 'none', 
                  borderTop: '1px solid var(--border-color)' 
                }} />
                <button
                  className="dropdown-item-modern"
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay para cerrar dropdown al hacer clic fuera */}
      {isDropdownOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Header;
