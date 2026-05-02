import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material";
import PriorityPage from "./pages/PriorityPage";
import AllNotificationsPage from "./pages/AllNotificationPages";

function App() {
    return (
        <BrowserRouter>
            <AppBar position="static" sx={{ marginBottom: 4 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Campus Notifications
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" component={Link} to="/priority">
                            Priority
                        </Button>
                        <Button color="inherit" component={Link} to="/all">
                            All Notifications
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md">
                <Routes>
                    <Route path="/" element={<Navigate to="/priority" replace />} />
                    <Route path="/priority" element={<PriorityPage />} />
                    <Route path="/all" element={<AllNotificationsPage />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;