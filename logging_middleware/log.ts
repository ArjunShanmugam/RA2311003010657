export async function Log(
    stack: string,
    level: string,
    pkg: string,
    message: string
) {
    try {
        const response = await fetch(
            "http://20.207.122.201/evaluation-service/logs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhczc5NTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjI5OCwiaWF0IjoxNzc3NzA1Mzk4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZWMxZTk5M2YtZTMxMi00YmJiLTgwZWMtMzNmYzVmMTc0OWM5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJqdW4gcyIsInN1YiI6IjZkNzcxYWRjLTI2MjEtNDVkZC1hM2FmLTVhOTdiNWVjNTM3NiJ9LCJlbWFpbCI6ImFzNzk1M0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFyanVuIHMiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA2NTciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI2ZDc3MWFkYy0yNjIxLTQ1ZGQtYTNhZi01YTk3YjVlYzUzNzYiLCJjbGllbnRTZWNyZXQiOiJCZWZ2blhqVnpjVXNFbW53In0.BJSdq_kQ4zDb6mOaLmOAtHLVTbR4ZLGxTkQTKgYhSAc"
                },
                body: JSON.stringify({
                    stack,
                    level,
                    package: pkg,
                    message
                })
            }
        );

        if (!response.ok) {
            console.error("Logging failed:", await response.text());
        }
    } catch (error) {
        console.error("Error while sending log:", error);
    }
}