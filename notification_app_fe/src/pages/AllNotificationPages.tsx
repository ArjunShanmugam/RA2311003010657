import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../services/notificationService";
import { Select, MenuItem, Button, Box, Typography, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { Log } from "../../../logging_middleware/log";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function AllNotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    useEffect(() => {
        Log("frontend", "info", "page", "All notifications page loaded");
    }, []);

    useEffect(() => {
        load();
    }, [type, page]);

    async function load() {
        setLoading(true);
        try {
            const res = await fetchNotifications(TOKEN, limit, page, type);
            setNotifications(res.notifications);
        } catch (error) {
            Log("frontend", "error", "page", "Failed to fetch all notifications");
        } finally {
            setLoading(false);
        }
    }

    const handleFilterChange = (e: any) => {
        const newType = e.target.value;
        Log("frontend", "info", "state", `Filter changed to: ${newType || 'All'}`);
        setType(newType);
        setPage(1);
    };

    const handleNextPage = () => {
        Log("frontend", "info", "state", `Pagination next clicked (to page ${page + 1})`);
        setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            Log("frontend", "info", "state", `Pagination prev clicked (to page ${page - 1})`);
            setPage((prev) => prev - 1);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                All Notifications
            </Typography>

            <FormControl sx={{ minWidth: 200, marginBottom: 3 }}>
                <InputLabel>Notification Type</InputLabel>
                <Select
                    value={type}
                    label="Notification Type"
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Event">Event</MenuItem>
                    <MenuItem value="Result">Result</MenuItem>
                    <MenuItem value="Placement">Placement</MenuItem>
                </Select>
            </FormControl>

            {loading ? (
                <Box sx={{ display: 'flex', mt: 4 }}><CircularProgress /></Box>
            ) : (
                <Box>
                    {notifications.map((n) => (
                        <NotificationCard key={n.ID} data={n} />
                    ))}
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 5 }}>
                <Button variant="contained" disabled={page === 1} onClick={handlePrevPage}>
                    Previous Page
                </Button>
                <Typography variant="body1" sx={{ alignSelf: 'center' }}>
                    Page {page}
                </Typography>
                <Button variant="contained" disabled={notifications.length < limit} onClick={handleNextPage}>
                    Next Page
                </Button>
            </Box>
        </Box>
    );
}