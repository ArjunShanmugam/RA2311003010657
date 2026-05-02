import type { Notification } from "../services/notificationService";

const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

export function getTopNotifications(
    notifications: Notification[],
    limit = 10
) {
    return notifications
        .sort((a, b) => {
            const typeDiff =
                priorityMap[b.Type] - priorityMap[a.Type];

            if (typeDiff !== 0) return typeDiff;

            return (
                new Date(b.Timestamp).getTime() -
                new Date(a.Timestamp).getTime()
            );
        })
        .slice(0, limit);
}