import { Log } from "../../../logging_middleware/log";

export type Notification = {
    ID: string;
    Type: "Placement" | "Result" | "Event";
    Message: string;
    Timestamp: string;
};

const API_URL =
    "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications(
    token: string,
    limit?: number,
    page?: number,
    type?: string
) {
    try {
        let url = `${API_URL}?`;

        if (limit) url += `limit=${limit}&`;
        if (page) url += `page=${page}&`;
        if (type) url += `notification_type=${type}`;

        Log("frontend", "info", "api", `Fetch limit=${limit||'all'} p=${page||1} t=${type||'all'}`);

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            Log("frontend", "error", "api", "Notification fetch failed");
            throw new Error("API error");
        }

        Log("frontend", "info", "api", "Notifications fetched successfully");

        return response.json();
    } catch {
        Log("frontend", "fatal", "api", "Notification API crashed");
        throw new Error("Fetch failed");
    }
}