import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingActionButton from "./components/FloatingActionButton";
import NotificationContainer from "./components/NotificationContainer";
import DebugUser from "./components/DebugUser";
import { NotificationProvider, useNotificationContext } from "./context/NotificationContext";
import TaskList from "./pages/tasks/TaskList";
import TaskForm from "./pages/tasks/TaskForm";
import TaskDetail from "./pages/tasks/TaskDetail";
import Login from "./pages/Login";

const AppContent = () => {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks/new" 
            element={
              <ProtectedRoute requiredRole="TEACHER">
                <TaskForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks/edit/:id" 
            element={
              <ProtectedRoute requiredRole="TEACHER">
                <TaskForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks/:id" 
            element={
              <ProtectedRoute>
                <TaskDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta para acceso no autorizado */}
          <Route 
            path="/unauthorized" 
            element={
              <div className="form-modern animate-fade-in">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--danger-color)' }}>
                  ⚠️ Acceso Denegado
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                  No tienes permisos para acceder a esta página.
                </p>
                <div style={{ textAlign: 'center' }}>
                  <button 
                    className="btn-modern btn-primary-modern"
                    onClick={() => window.history.back()}
                  >
                    ← Volver
                  </button>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
      
      {/* Botón flotante para agregar tareas (solo para profesores) */}
      <FloatingActionButton />
      
      {/* Sistema de notificaciones */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      
      {/* Debug component - REMOVER EN PRODUCCIÓN */}
      <DebugUser />
    </div>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
};

export default App;