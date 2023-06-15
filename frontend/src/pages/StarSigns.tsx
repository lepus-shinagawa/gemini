import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const startSignNames = [
    "おひつじ座", "おうし座", "ふたご座", "かに座", "しし座", "おとめ座",
    "てんびん座", "さそり座", "いて座", "やぎ座", "みずがめ座", "うお座"];
const dayOfWeekNames = ["日", "月", "火", "水", "木", "金", "土"];

function StarSigns() {
    const date = new Date();
    const dayOfWeekName = dayOfWeekNames[date.getDay()];
    return (
        <>
            <Typography variant="h2">
                AI星座占い
            </Typography>
            <Typography variant="h2">
                {date.getMonth() + 1}/{date.getDate() + 1}({dayOfWeekName})の運勢
            </Typography>
            <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {startSignNames.map((starSignName, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <Link
                                        to="/result"
                                        state={{
                                            date: date,
                                            dayOfWeekName: dayOfWeekName,
                                            starSignName: starSignName,
                                        }}
                                    >
                                        {starSignName}
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

export default StarSigns
