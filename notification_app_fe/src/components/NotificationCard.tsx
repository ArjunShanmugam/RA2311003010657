import { Card, CardContent, Typography } from "@mui/material";
import { markViewed, getViewed } from "../state/viewedStore";

export default function NotificationCard({ data }: any) {
    const viewed = getViewed().includes(data.ID);

    return (
        <Card
            onClick={() => markViewed(data.ID)}
            sx={{
                marginBottom: 2,
                backgroundColor: viewed ? "#f5f5f5" : "#e3f2fd",
            }}
        >
            <CardContent>
                <Typography variant="h6">{data.Type}</Typography>

                <Typography>{data.Message}</Typography>

                <Typography variant="caption">
                    {data.Timestamp}
                </Typography>
            </CardContent>
        </Card>
    );
}