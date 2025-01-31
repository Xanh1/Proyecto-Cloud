"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const url = "https://gateway--sm5wvgr.blackgrass-9559a3b0.westus2.azurecontainerapps.io"
    const socket = io("https://notificaciones--q4ssrxq.blackgrass-9559a3b0.westus2.azurecontainerapps.io/");
    // 1. Obtener notificaciones iniciales al cargar la página
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(url + "/notificaciones/all");
        setNotifications(response.data.data); // Asegúrarse de que el backend devuelva un array
      } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
      }
    };
    fetchNotifications();

    // 2. Escuchar nuevas notificaciones desde el servidor (WebSocket)
    socket.on("notificacion", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      socket.off("notificacion");
      socket.disconnect();
    };
  }, []);

  const handleMarkAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      estado: "leído",
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button onClick={handleMarkAsRead}>Mark all as read</button>
      </div>
      <ul className="notifications-list">
        {notifications.map((notif, index) => (
          <li key={index} className="notification-item">
            <div>
              <strong>{notif.titulo}</strong>
              <p>{notif.mensaje}</p>
              <span>{notif.estado}</span>
              <small>{notif.hora}</small>
            </div>
            {index !== notifications.length - 1 && <hr className="separator" />}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .notifications-container {
          width: 600px; /* Aumentado el ancho del cuadro */
          margin: 20px auto;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          padding: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .notifications-header h3 {
          margin: 0;
          font-size: 20px; /* Tamaño de fuente mayor */
          color: #000; /* Color oscuro para el título */
        }

        .notifications-header button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
        }

        .notifications-header button:hover {
          background-color: #0056b3;
        }

        .notifications-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .notification-item {
          padding: 8px 0;
          font-size: 16px; /* Tamaño de fuente mayor */
          color: #333; /* Color fuerte y oscuro */
        }

        .notification-item strong {
          font-weight: bold;
          color: #000; /* Color fuerte para el título de la notificación */
        }

        .separator {
          border: 0;
          border-top: 1px solid #ddd;
          margin: 8px 0;
        }

        .notification-item span {
          color: #555; /* Color más suave para el estado */
        }

        .notification-item small {
          color: #777; /* Color más tenue para la hora */
        }
      `}</style>
    </div>
  );
};
export default NotificationsPage;
