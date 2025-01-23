import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

export default function Notifications({ userId }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function loadNotifications() {
            const data = await fetchNotifications(userId);
            setNotifications(data);
        }
        loadNotifications();
    }, [userId]);

    return (
        <div>
            <h2>Notificaciones</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        <strong>{notification.title}:</strong> {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}