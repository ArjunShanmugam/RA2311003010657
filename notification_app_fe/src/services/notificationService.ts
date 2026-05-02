import { Log } from "../logging_middleware/log";

export type Notification = {
    ID: string;
    Type: "Placement" | "Result" | "Event";
    Message: string;
    Timestamp: string;
};

export async function fetchNotifications(token: string) {
    try {
        Log("frontend", "info", "api", "Calling notifications API");

        const response = await fetch(
            "http://20.207.122.201/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            Log("frontend", "error", "api", "Notifications API failed");
            throw new Error("Failed to fetch notifications");
        }

        Log("frontend", "info", "api", "Notifications fetched successfully");

        return response.json();
    } catch (error) {
        Log("frontend", "fatal", "api", "Notifications API crashed");
        throw error;
    }
}