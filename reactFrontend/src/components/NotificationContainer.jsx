import Notification from './Notification';

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 10000 }}>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            marginBottom: '1rem',
            transform: `translateY(${index * 80}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => onRemove(notification.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer; 