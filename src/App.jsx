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

function App() {
    console.log("親コンポーネント");

    // API取得
    const url = process.env.REACT_APP_BASE_URL;
    const roomId = process.env.REACT_APP_ROOM_ID;

    const [progress_ms, setProgress_ms] = useState(0);
    const progressRef = useRef(progress_ms);
    
    const getDelay = (data) => {
        const getSpotifyTime = new Date(data.get_spotify_timestamp);
        const currentDate = new Date();
        return currentDate.getTime() - getSpotifyTime.getTime();
    }

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data, error, isLoading } = useSWR(
        `${url}/api/now?room_id=${roomId}`,
        fetcher,
        { refreshInterval: 1000 }
    );

    useEffect(() => {
        if (data && data.progress_ms !== undefined) {
            setProgress_ms(data.progress_ms + getDelay(data));
        }
    }, [data]);

    useEffect(() => {
        progressRef.current = progress_ms;
    }, [progress_ms]);

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

    if (error) return 'エラーが発生しました';
    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Global
                styles={css`
                    ${emotionReset}
                    body{
                        font-family: "Noto Sans JP", sans-serif;
                    }
                `}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <ProgressBar now={data} progress_ms={progress_ms} />
                            <TopInfo now={data} />
                            <Lyrics now={data} progress_ms={progress_ms} />
                        </>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
