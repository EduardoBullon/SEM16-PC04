import { createContext, useContext } from 'react';
import { useNotification } from '../hooks/useNotification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notificationUtils = useNotification();

  return (
    <NotificationContext.Provider value={notificationUtils}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}; 