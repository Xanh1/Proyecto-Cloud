export async function fetchNotifications(userId) {
    const response = await fetch(`http://localhost:5000/api/notifications?user_id=${userId}`);
    const data = await response.json();
    return data;
}

export async function createNotification(notification) {
    const response = await fetch(`http://localhost:5000/api/notifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
    });
    return await response.json();
}