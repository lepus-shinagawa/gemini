import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

interface State {
    date: Date,
    dayOfWeekName: string,
    starSignName: string,
}

function Result() {
    const location = useLocation();
    const { date, dayOfWeekName, starSignName } = location.state as State;
    return (
        <>
            <Typography variant="h2">
                AI星座占い
            </Typography>
            <Typography variant="h2">
                {date.getMonth() + 1}/{date.getDate() + 1}({dayOfWeekName})の{starSignName}の運勢
            </Typography>
        </>
    )
}

export default Result
