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
import BackImg from "./components/BackImg/BackImg";
import JoinRoom from "./pages/JoinRoom";

function getRoomId (){
    let params = new URLSearchParams(document.location.search).get("roomId");
    if(params !== null && params !== ""){
        console.log(params);
        return params; 
    }else{
        return null;
    }
   
}


function leaveRoom(){
    sessionStorage.setItem('roomId', null);
    document.location.href="/";
}

function App() {
    // APIリンク
    const url = process.env.REACT_APP_BASE_URL;
    // スリープ防止
    const { isSupported, isLocked, request, release } = useWakeLock();
    // ドロワー状態管理
    const [bottomDraweropen, setBottomDraweropen] = useState(false);

    // const roomId = process.env.REACT_APP_ROOM_ID;
    var roomId = sessionStorage.getItem('roomId');
    if(roomId === null){
        console.log("ridairekuto")
        sessionStorage.setItem('roomId', getRoomId()); 
        roomId = sessionStorage.getItem('roomId');
        if(roomId == "null"){
            // console.log("ridairekuto")
            // document.location.href="/join";
        }

        console.log("roomId", roomId);
    }

    
    // SnackBar
    const { open, snackbarSeverity, snackbarMessage, snackbarTimer, snackbarPosition, noticeSnackbar, setOpen , handleClose } = useSnackBar({bottomDraweropen});

    // API取得
    const { data, error, isLoading, progress_ms, fetchSkip, addMusic} = useApi(url, roomId !== "null" ? roomId : null, noticeSnackbar, setOpen);


    const  [backGroundColor, setBackGroundColor] = useState("");
    const [isLight, setIsLight] = useState(false);

    // SWR処理
    if(roomId == "null"){
        return <JoinRoom />
    }
    // if (error) return <div style={{color: 'white'}}>エラーが発生しました。</div>;
    if (error) {
        if (error.status === 404) {
            return<div style={{color: "white"}}>ルームが存在しません。<JoinRoom message=""/></div>;
        }
        return <div style={{color: 'white'}}><JoinRoom message="エラーが発生しました。。再度参加してください。"/></div>;
    }

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
                    p {
                        color: #eee;
                    }
                `}
            />
            <BackImg now={data} setBackGroundColor={setBackGroundColor} setIsLight= {setIsLight}></BackImg>
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
                            <Controller now={data} isLight={isLight}/>
                            <TestDr now={data} fetchSkip={fetchSkip} setBottomDraweropen={setBottomDraweropen} bottomDraweropen={bottomDraweropen} isLocked={isLocked} release={release} request={request} leaveRoom={leaveRoom}/>
                            <Lyrics now={data} progress_ms={progress_ms} isLight={isLight} />
                            <div style={{display: 'flex'}}>
                                { backGroundColor ? 
                                
                                backGroundColor.map((queue, i) => {
                                    return (
                                        <div style={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: queue,
                                        }}></div>
                                    );
                                },
                            ) : ""}

                            {isLight ? <p style={{color: 'black'}}>明るい</p> : <p style={{color: 'white'}}>暗い</p>}
                               
                            </div>
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
                            <Controller now={data} isLight={isLight}/>
                            <SearchMusic url={url} roomId={roomId} addMusic={addMusic}/>
                            <TestDr now={data} fetchSkip={fetchSkip} setBottomDraweropen={setBottomDraweropen} bottomDraweropen={bottomDraweropen} isLocked={isLocked} release={release} request={request} leaveRoom={leaveRoom}/>

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
                            <Controller now={data}  isLight={isLight}/>
                            <TestDr now={data} fetchSkip={fetchSkip} setBottomDraweropen={setBottomDraweropen} bottomDraweropen={bottomDraweropen} isLocked={isLocked} release={release} request={request} leaveRoom={leaveRoom}/>
                            <History url={url} roomId={roomId}></History>
                        </>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
