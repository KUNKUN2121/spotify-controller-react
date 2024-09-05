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
import { CleaningServicesOutlined, Search } from "@mui/icons-material";
import MuiAlert from '@mui/material/Alert';
import TestDr from "./pages/TestDr";
import Controller from "./pages/Controller";
import SearchMusic from "./pages/SearchMusic";
import History from "./pages/History";

import useWakeLock from "react-use-wake-lock";
import { useApi } from "./hooks/useApi";
import { useSnackBar } from "./hooks/useSnackBar";

function App() {
    const url = process.env.REACT_APP_BASE_URL;
    const roomId = process.env.REACT_APP_ROOM_ID;

    // スリープ防止
    const { isSupported, isLocked, request, release } = useWakeLock();
    const [bottomDraweropen, setBottomDraweropen] = useState(false);
    
    // SnackBar
    const { open, snackbarSeverity, snackbarMessage, snackbarTimer, snackbarPosition,setSnackbarPosition, noticeSnackbar, setOpen , handleClose } = useSnackBar({bottomDraweropen});

    

    // API取得
    const { data, error, isLoading, progress_ms, fetchSkip, addMusic} = useApi(url, roomId, noticeSnackbar, setOpen);

    
    // SWR処理
    if (error) return <div style={{color: 'white'}}>エラーが発生しました。</div>;
    if (isLoading) return <div style={{color: 'white'}}>Loading...</div>;
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        return <div style={{color: 'white'}}>現在再生されていません。</div>;
    }

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
            <Snackbar 
                anchorOrigin={{
                    //  vertical : "top", horizontal: "center" 
                    vertical: snackbarPosition.bottom ? 'bottom' : 'top',
                    horizontal : "center",
                }}
                open={open} 
                autoHideDuration={snackbarTimer} 
                onClose={handleClose}
                style={{position: 'fixed', ...snackbarPosition }}
                // sx={{ bottom: { xs: 90, sm: 0 } }}
            >
                <MuiAlert 
                    // onClose={handleSnackbarClose} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                    >
                {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <ProgressBar now={data} progress_ms={progress_ms} />
                            {/* <Button variant="contained" onClick={handleOpen}>Register</Button> */}
                            {/* <SearchMusic/> */}
                            
                            <Controller now={data}/>
                            <TestDr now={data} fetchSkip={fetchSkip} setBottomDraweropen={setBottomDraweropen} bottomDraweropen={bottomDraweropen} isLocked={isLocked} release={release} request={request}/>
                            <Lyrics now={data} progress_ms={progress_ms} />
                            <div className="dummy" style={{
                                height: "100px",
                                flexShrink: '0'
                            }}>
                            </div>
                        </>
                    } />
                    <Route path="/search" element={
                        <>
                            <ProgressBar now={data} progress_ms={progress_ms} />
                            <Controller now={data}/>
                            <SearchMusic url={url} roomId={roomId} addMusic={addMusic}/>
                            <TestDr now={data} fetchSkip={fetchSkip} setBottomDraweropen={setBottomDraweropen} bottomDraweropen={bottomDraweropen} isLocked={isLocked} release={release} request={request}/>

                            <div className="dummy" style={{
                                height: "80px",
                                flexShrink: '0'
                            }}>
                            </div>
                        </>
                    } />
                    <Route path="/history" element={
                        <>
                            <ProgressBar now={data} progress_ms={progress_ms} />
                            <Controller now={data}/>
                            <TestDr now={data} fetchSkip={fetchSkip} setBottomDraweropen={setBottomDraweropen} bottomDraweropen={bottomDraweropen} isLocked={isLocked} release={release} request={request}/>
                            <History url={url} roomId={roomId}></History>
                        </>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
