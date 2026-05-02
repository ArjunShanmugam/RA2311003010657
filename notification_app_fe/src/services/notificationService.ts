export type Notification = {
    ID: string;
    Type: "Placement" | "Result" | "Event";
    Message: string;
    Timestamp: string;
};

const API_URL =
    "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications(token: string) {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }

    return response.json();
}