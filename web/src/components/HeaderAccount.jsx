"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axios from "axios";
import { Bell, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { formatDistanceToNow, format, parseISO } from "date-fns";
import { es, ro } from "date-fns/locale";

const API_URL_NOTIFICACIONES = process.env.API_NOTIFICATION;
const uid = Cookies.get("uid");
const socket = io(API_URL_NOTIFICACIONES, {transports: ['websocket']});
const rol = Cookies.get("rol");

export default function HeaderAccount() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);  // Si el token está presente, el usuario está autenticado
      setUserRole(Cookies.get("rol"));
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("usuario");
    Cookies.remove("necesary");
    Cookies.remove("uid");
    Cookies.remove("id_person");
    Cookies.remove("rol");
    Cookies.remove("email");
    setIsAuthenticated(false);  // Cambiar el estado a no autenticado
  };

  useEffect(() => {
    if (!isAuthenticated) return;  // No hacer nada si el usuario no está autenticado

    const getNotifications = async () => {
      try {
        const response = await axios.get(API_URL_NOTIFICACIONES + "/notificaciones/get/" + uid);
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
      }
    };

    if (rol === "municipal") {
      socket.on("notificacion_Municipales", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setHasNewNotification(true);
      });
    }
    if (rol === "ciudadano") {
      socket.on("notificacion", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setHasNewNotification(true);
      });
    }

    getNotifications();

    return () => {
      socket.off("notificacion");
      socket.off("notificacion_Municipales");
    };
  }, [isAuthenticated, rol, uid]);

  // Maneja el evento de hacer clic fuera para cerrar las notificaciones
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    setHasNewNotification(false);
  }, []);

  return (
    <header className="w-full flex justify-between items-center py-5 px-4 bg-white shadow">
      {/* Logo */}
      <Link href="/" className="flex ms-2 md:me-24">
        <span className="px-2 self-center text-xl font-semibold sm:text-xl whitespace-nowrap">
          Loja Reportes
        </span>
      </Link>

      {/* Navegación */}
      <nav className="space-x-6 flex items-center">
        {/* Links para municipal y ciudadano, solo si está autenticado */}
        {isAuthenticated ? (
          <>
            {userRole === "municipal" ? (
              <>
                <Link href="/report/list" className="hover:underline">Reportes</Link>
                <Link href="/municipal/modify" className="hover:underline">Perfil</Link>
              </>
            ) : userRole === "ciudadano" ? (
              <>
                <Link href="/ciudadano/modify" className="hover:underline">Perfil</Link>
              </>
            ) : userRole === "administrador" ? (
              <>
                <Link href="/administrador/" className="hover:underline">Cuentas</Link>
                <Link href="/report/list" className="hover:underline">Reportes</Link>
                <Link href="/ciudadano/modify" className="hover:underline">Perfil</Link>
              </>
            ) : null}

            {/* Notificaciones */}
            <div className="relative" ref={notificationRef}>
              <button
                className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setHasNewNotification(false);
                }}
              >
                <Bell className="text-gray-600" size={22} />
                {hasNewNotification && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 shadow-lg p-4 rounded-lg max-h-80 overflow-y-auto">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-semibold">Notificaciones</h2>
                    {notifications.length > 0 && (
                      <button className="text-xs text-blue-500 hover:underline" onClick={markAllAsRead}>
                        Marcar todas como leídas
                      </button>
                    )}
                  </div>
                  <ul className="mt-2 text-sm">
                    {notifications.length > 0 ? (
                      notifications.map((noti) => (
                        <NotificationItem key={`${noti.uid}-${noti.created_at}`} notification={noti} />
                      ))
                    ) : (
                      <li className="py-2 text-gray-500 text-center">No hay notificaciones</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Cerrar sesión */}
            <Link href="/" className="px-4 py-2 border border-black text-white bg-black rounded-lg text-sm">
              <span onClick={logout}>Cerrar sesión</span>
            </Link>
          </>
        ) : (
          // Si no está autenticado, mostrar enlace para iniciar sesión
          <Link href="/login" className="px-4 py-2 border border-black text-black rounded-lg text-sm">
            Iniciar sesión
          </Link>
        )}
      </nav>
    </header>
  );
}

function NotificationItem({ notification }) {
  const { titulo, mensaje, tipo, created_at } = notification;

  const iconMap = {
    success: <CheckCircle className="text-green-500" size={18} />,
    warning: <AlertTriangle className="text-yellow-500" size={18} />,
  };

  return (
    <li className="py-2 border-b flex items-start gap-3">
      {iconMap[tipo] || <Bell className="text-gray-400" size={18} />}
      <div>
        <strong>{titulo}</strong>
        <p className="text-xs text-gray-600">{mensaje}</p>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={14} /> {formatDate(created_at)}
        </p>
      </div>
    </li>
  );
}

function formatDate(dateString) {
  const date = parseISO(dateString);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return `Hoy a las ${format(date, "HH:mm", { locale: es })}`;
  }

  return formatDistanceToNow(date, { locale: es, addSuffix: true });
}
