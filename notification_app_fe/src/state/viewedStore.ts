export function getViewed(): string[] {
    return JSON.parse(localStorage.getItem("viewed") || "[]");
}

export function markViewed(id: string) {
    const viewed = getViewed();

    if (!viewed.includes(id)) {
        viewed.push(id);
        localStorage.setItem("viewed", JSON.stringify(viewed));
    }
}