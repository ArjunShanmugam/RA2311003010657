import { useEffect } from "react";
import { Log } from "../../logging_middleware/log";

function App() {
    useEffect(() => {
        Log("frontend", "info", "page", "App loaded successfully");
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Frontend Assessment Setup Ready 🚀</h1>

            <button
                onClick={() =>
                    Log("frontend", "info", "component", "Test button clicked")
                }
            >
                Test Log Button
            </button>
        </div>
    );
}

export default App;