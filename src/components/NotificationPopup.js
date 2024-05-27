import React, { useEffect } from 'react';
import '../styles/notification.css';

const NotificationPopup = ({ message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notification-popup">
      <p>{message}</p>
      <div className="progress-bar">
        <div className="progress" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  );
};

export default NotificationPopup;
