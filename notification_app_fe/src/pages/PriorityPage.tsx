import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../services/notificationService";
import { getTopNotifications } from "../utils/prioritySorter";
import { Log } from "../../../logging_middleware/log";
import type { Notification } from "../services/notificationService";
import { Typography, Box, CircularProgress } from "@mui/material";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function PriorityPage() {
    const [data, setData] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                Log("frontend", "info", "page", "Fetching notifications for Priority Page");
                const result = await fetchNotifications(TOKEN);
                
                const topPriority = getTopNotifications(result.notifications, 10);
                setData(topPriority);
                
                Log("frontend", "info", "page", "Priority notifications loaded successfully");
            } catch (error) {
                Log("frontend", "error", "page", "Failed to load priority notifications");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Priority Notifications
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Box>
                    {data.map((n) => (
                        <NotificationCard key={n.ID} data={n} />
                    ))}
                </Box>
            )}
        </Box>
    );
}