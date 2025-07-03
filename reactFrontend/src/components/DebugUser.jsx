import { useAuthStore } from "../store/authStore";

const DebugUser = () => {
  const { user, token } = useAuthStore();

  if (!user) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '0.8rem',
      zIndex: 10000,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>🔍 Debug User</h4>
      <div><strong>Username:</strong> {user.username}</div>
      <div><strong>Role:</strong> {user.role}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Token:</strong> {token ? '✅ Presente' : '❌ Ausente'}</div>
      <div><strong>Is Professor:</strong> {user.role === 'PROFESSOR' ? '✅ Sí' : '❌ No'}</div>
      <div><strong>Can Create Tasks:</strong> {user.role === 'PROFESSOR' ? '✅ Sí' : '❌ No'}</div>
    </div>
  );
};

export default DebugUser; 