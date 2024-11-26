import React, { useEffect } from "react";

function Notification({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(onClose, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}

export default Notification;
