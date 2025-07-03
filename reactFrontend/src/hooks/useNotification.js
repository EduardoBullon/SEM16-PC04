import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newNotification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration = 5000) => {
    return showNotification(message, 'success', duration);
  }, [showNotification]);

  const showError = useCallback((message, duration = 5000) => {
    return showNotification(message, 'error', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration = 5000) => {
    return showNotification(message, 'warning', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration = 5000) => {
    return showNotification(message, 'info', duration);
  }, [showNotification]);

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification
  };
}; 