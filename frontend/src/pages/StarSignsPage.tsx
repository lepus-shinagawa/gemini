import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import {StarSigns} from "../StarSign.ts";

const dayOfWeekNames = ["日", "月", "火", "水", "木", "金", "土"];

export default function StarSignsPage() {
    const starSigns = StarSigns.get();
    const date = new Date();
    const dayOfWeekName = dayOfWeekNames[date.getDay()];
    return (
        <>
            <Typography variant="h2" align="center">
                AI星座占い
            </Typography>
            <Typography variant="h2">
                {date.getMonth() + 1}/{date.getDate()}({dayOfWeekName})の運勢
            </Typography>
            <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {starSigns.map((starSign, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <Link
                                        to={{
                                            pathname: "/result",
                                            search: "?" + new URLSearchParams({
                                                date: date.toString(),
                                                starSignIndex: starSign.getIndex().toString(),
                                                dayOfWeekName: dayOfWeekName,
                                            }),
                                        }}
                                    >
                                        {starSign.toLocalizedString()}
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
