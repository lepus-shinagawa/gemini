import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import {GeminiContract} from "../contracts/GeminiContract.ts";
import {Button} from "@mui/material";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import {StarSign} from "../StarSign.ts";
import NFTCard from "../components/NFTCard.tsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'gray',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Result() {
    const [result, setResult] = useState({description: "", image: ""});
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openNFT, setOpenNFT] = useState(false);

    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);

    const date = new Date(query.get("date") as string);
    const starSignIndex =
        parseInt(query.get("starSignIndex") as string, 10);
    const starSign = new StarSign(starSignIndex);
    const starSignName = starSign.toLocalizedString();
    const dayOfWeekName = query.get("dayOfWeekName");

    useEffect(() => {
        const fetchData = async () => {
            const r = await starSign.getMedaData(date);
            setResult({
                description: r["description"],
                image: r["image"],
            });
        }
        fetchData().catch(console.error);
    },[])

    const onClick = () => {
        (async () => {
            setErrorMessage("");
            setOpen(true);
            try{
                const geminiContract = new GeminiContract();
                await geminiContract.safeMint(date, starSignIndex);
                setOpenNFT(true);
            } catch (e: any) {
                setErrorMessage(e.message);
            }
            setOpen(false);
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
            <div>{result["description"]}</div>
            <Button
                variant="outlined"
                onClick={onClick}
            >
                ミントする
            </Button>
            <Typography variant="h5" color="#ff0000">
                {errorMessage}
            </Typography>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            ミントします。MetaMaskの操作を完了してください。
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <CircularProgress disableShrink />
                        </Typography>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openNFT}
                onClose={() => setOpenNFT(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openNFT}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            ミント完了
                        </Typography>
                        <NFTCard uri={result["image"]}></NFTCard>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default Result
