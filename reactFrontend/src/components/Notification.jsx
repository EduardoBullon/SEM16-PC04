import { useState, useEffect } from 'react';

const Notification = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getNotificationStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-lg)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 10000,
      maxWidth: '400px',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          background: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--success-color)',
          borderColor: 'rgba(16, 185, 129, 0.3)'
        };
      case 'error':
        return {
          ...baseStyle,
          background: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--danger-color)',
          borderColor: 'rgba(239, 68, 68, 0.3)'
        };
      case 'warning':
        return {
          ...baseStyle,
          background: 'rgba(245, 158, 11, 0.1)',
          color: 'var(--warning-color)',
          borderColor: 'rgba(245, 158, 11, 0.3)'
        };
      default:
        return {
          ...baseStyle,
          background: 'rgba(79, 70, 229, 0.1)',
          color: 'var(--primary-color)',
          borderColor: 'rgba(79, 70, 229, 0.3)'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  if (!isVisible) return null;

  return (
    <div style={getNotificationStyle()}>
      <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0',
          marginLeft: '0.5rem'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification; 