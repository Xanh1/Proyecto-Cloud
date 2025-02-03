import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function HeaderAccount() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const notificationRef = useRef(null);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("usuario");
    Cookies.remove("necessary");
    Cookies.remove("rol");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const rol = Cookies.get("rol");
        const necessary = Cookies.get("necessary");
        let url = "";

        if (rol === "ciudadano") {
          url = `http://localhost:5002/notificaciones/allnotificacionesusuario/${necessary}`;
        } else if (rol === "municipal") {
          url = "http://localhost:5002/notificaciones/all";
        }

        if (url) {
          const response = await fetch(url);
          const data = await response.json();
          if (data.tipo === "Success") {
            if (data.data.length > notifications.length) {
              setHasNewNotification(true);
            }
            setNotifications(data.data);
          }
        }
      } catch (error) {
        console.error("Error obteniendo notificaciones:", error);
      }
    };

    fetchNotifications();
  }, []);

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

  return (
    <header className="w-full flex justify-between items-center py-5 px-2 bg-white">
      <Link href="/" className="flex ms-2 md:me-24">
        <span className="px-2 self-center text-xl font-semibold sm:text-xl whitespace-nowrap">
          Reportes
        </span>
      </Link>
      <nav className="space-x-6 flex items-center">
        <Link href="/report" className="hover:underline">Reportes</Link>
        <Link href="/person" className="hover:underline">Cuentas</Link>
        <Link href="/person/modify" className="hover:underline">Perfil</Link>

        {/* Campana de notificaciones */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => { setShowNotifications(!showNotifications); setHasNewNotification(false); }}
          >
            🔔
            {hasNewNotification && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 shadow-lg p-4 rounded-lg max-h-80 overflow-y-auto">
              <p className="text-sm font-semibold">Notificaciones</p>
              <ul className="mt-2 text-sm"> 
                {notifications.length > 0 ? (
                  notifications.map((noti) => (
                    <li key={noti.id} className="py-1 border-b">
                      <strong>{noti.titulo}</strong>: {noti.mensaje}
                    </li>
                  ))
                ) : (
                  <li className="py-2 text-gray-500">No hay notificaciones</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <Link href="/" className="px-4 py-2 rounded border border-black text-white bg-black rounded-lg text-sm">
          <span onClick={logout}>Cerrar sesión</span>
        </Link>
      </nav>
    </header>
  );
}
