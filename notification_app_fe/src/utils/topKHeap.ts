import type { Notification } from "../services/notificationService";

const priorityWeight = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

export function comparePriority(a: Notification, b: Notification) {
    const typeDiff =
        priorityWeight[b.Type] - priorityWeight[a.Type];

    if (typeDiff !== 0) return typeDiff;

    return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
    );
}
