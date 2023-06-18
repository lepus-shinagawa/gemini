import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import {GeminiContract} from "../contracts/GeminiContract.ts";
import {Button} from "@mui/material";

function Result() {
    const [result, setResult] = useState(["読み込み中....", "", ""]);
    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);

    const date = new Date(query.get("date") as string);
    const starSignName = query.get("starSignName");
    const starSignIndex =
        parseInt(query.get("starSignIndex") as string, 10);
    const dayOfWeekName = query.get("dayOfWeekName");

    useEffect(() => {
        const fetchData = async () => {
            const r = await new GeminiContract()
                .getResult(starSignIndex);
            setResult(r);
        }
        fetchData().catch(console.error);
    },[])

    const onClick = () => {
        (async () => {
            const geminiContract = new GeminiContract();
            await geminiContract.mint(starSignIndex);
            window.alert("ミントに成功しました")

        })();
    };

    return (
        <>
            <Typography variant="h2">
                AI星座占い
            </Typography>
            <Typography variant="h2">
                {date.getMonth() + 1}/{date.getDate()}({dayOfWeekName})の{starSignName}の運勢
            </Typography>
            <div>{result[0]}</div>
            <div>{result[1]}</div>
            <div>{result[2]}</div>
            <Button
                variant="outlined"
                onClick={onClick}
            >
                ミントする
            </Button>
        </>
    )
}

export default Result
