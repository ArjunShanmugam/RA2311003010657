import { useEffect, useState } from "react";
import { fetchNotifications } from "./services/notificationService";
import { getTopNotifications } from "./utils/prioritySorter";
import { Log } from "./logging_middleware/log";

function App() {
    const [notifications, setNotifications] = useState<any[]>([]);

    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhczc5NTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzgzNywiaWF0IjoxNzc3NzAyOTM3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiY2JlZWVlODQtYTZjZi00YTg1LWFkZWItNmQwZjRhZDk5ZTI1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJqdW4gcyIsInN1YiI6IjZkNzcxYWRjLTI2MjEtNDVkZC1hM2FmLTVhOTdiNWVjNTM3NiJ9LCJlbWFpbCI6ImFzNzk1M0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFyanVuIHMiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA2NTciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI2ZDc3MWFkYy0yNjIxLTQ1ZGQtYTNhZi01YTk3YjVlYzUzNzYiLCJjbGllbnRTZWNyZXQiOiJCZWZ2blhqVnpjVXNFbW53In0.NXiEC5Grm-UI-F1n_m4FtldYnw65UwiTye7S3gCoyL0";

    useEffect(() => {
        async function loadNotifications() {
            try {
                Log("frontend", "info", "api", "Fetching notifications");

                const data = await fetchNotifications(TOKEN);

                const topNotifications = getTopNotifications(
                    data.notifications
                );

                setNotifications(topNotifications);

                Log(
                    "frontend",
                    "info",
                    "state",
                    "Top notifications calculated successfully"
                );
            } catch (error) {
                Log(
                    "frontend",
                    "error",
                    "api",
                    "Failed to fetch notifications"
                );
            }
        }

        loadNotifications();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Top Priority Notifications</h2>

            {notifications.map((n) => (
                <div key={n.ID}>
                    <strong>{n.Type}</strong> — {n.Message}
                </div>
            ))}
        </div>
    );
}

export default App;