import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProgressBar from "./pages/ProgressBar";
import './index.css';
import Lyrics from "./pages/Lyrics";
import TopInfo from "./pages/TopInfo";

import emotionReset from "emotion-reset";
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { useEffect, useRef, useState } from "react";
import useSWR from 'swr';
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { Button, Snackbar } from "@mui/material";
import { CleaningServicesOutlined } from "@mui/icons-material";
import MuiAlert from '@mui/material/Alert';
import SearchMusic from "./pages/SearchMusic";


function App() {

    // SnackBar
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarTimer, setSnackbarTimer] = useState(6000);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false)
    };

    const noticeSnackbar = (severity, message, timer) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarTimer(timer);
        handleOpen();
    }


    // API取得
    const url = process.env.REACT_APP_BASE_URL;
    const roomId = process.env.REACT_APP_ROOM_ID;


    // スキップ機能
    const fetchSkip = async (value) => {
        console.log("fetching_history");
        const response = await fetch(url + "/api/" + value + "?room_id=" + roomId);
        console.log(value);
        if(value == "next"){
            noticeSnackbar("success", "スキップしました。", 3000);
        }else if(value == "previous"){
            noticeSnackbar("success", "前の曲に戻りました。", 3000);
        }
        mutate(); // SWRのキャッシュを更新
        return true;
    }




    const [progress_ms, setProgress_ms] = useState(0);
    const progressRef = useRef(progress_ms);
    



    // 遅延計算
    const getDelay = (data) => {
        const getSpotifyTime = new Date(data.get_spotify_timestamp);
        const currentDate = new Date();
        return currentDate.getTime() - getSpotifyTime.getTime();
    }



    // SWR Fetch
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading, mutate } = useSWR(
        `${url}/api/now?room_id=${roomId}`,
        fetcher,
        { refreshInterval: 5000 }
    );


    // 遅延時間計算
    useEffect(() => {
        if (data && data.progress_ms !== undefined) {
            setProgress_ms(data.progress_ms + getDelay(data));
        }
    }, [data]);


    // プログレスバーの更新
    useEffect(() => {
        progressRef.current = progress_ms;
    }, [progress_ms]);

    // プログレスバーの更新
    useEffect(() => {
        const interval = setInterval(() => {
            if (data && data.progress_ms !== undefined) {
                setProgress_ms(prevProgress => {
                    const updatedProgress = prevProgress + 500;
                    if (updatedProgress >= data.duration_ms) {
                        return data.duration_ms;
                    }
                    return updatedProgress;
                });
            }
        }, 500);

        return () => clearInterval(interval); // クリーンアップ処理を追加
    }, [data]); // dataが変更されるたびにインターバルを設定


    
    // SWR処理
    if (error) return 'エラーが発生しました';
    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Global
                styles={css`
                    ${emotionReset}
                    body{
                        font-family: "Noto Sans JP", sans-serif;
                        user-select: none;
                    }
                `}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Snackbar 
                                open={open} 
                                autoHideDuration={snackbarTimer} 
                                onClose={handleClose}
                                // style={{position: 'fixed', ...snackbarPosition }}
                            >
                                <MuiAlert 
                                    // onClose={handleSnackbarClose} 
                                    severity={snackbarSeverity} 
                                    sx={{ width: '100%' }}
                                    >
                                {snackbarMessage}
                                </MuiAlert>
                            </Snackbar>
                            <ProgressBar now={data} progress_ms={progress_ms} />
                            {/* <Button variant="contained" onClick={handleOpen}>Register</Button> */}
                            <SearchMusic/>
                            <TopInfo now={data} fetchSkip={fetchSkip}/>
                            <Lyrics now={data} progress_ms={progress_ms} />
                            <div className="dummy" style={{
                                height: "100px",
                                flexShrink: '0'
                            }}>

                            </div>
                        </>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
