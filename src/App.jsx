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

function App() {
    const { isSupported, isLocked, request, release } = useWakeLock();
    // SnackBar
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarTimer, setSnackbarTimer] = useState(6000);
    const [snackbarPosition, setSnackbarPosition] = useState();
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false)
    };

    const noticeSnackbar = (severity, message, timer ) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarTimer(timer);
        // setSnackbarPosition(position);
        // if(snackbarBottomKeyboardPosition > snackbarBottomDrawerPosition){
        //     setSnackbarPosition(snackbarBottomKeyboardPosition)
        // }else{
        //     setSnackbarPosition(snackbarBottomDrawerPosition)
        // }
        // // setSnackbarPosition(snackbarBottomPosition);
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
            noticeSnackbar("success", "スキップしました。", 3000, {top: '75px'});
        }else if(value == "previous"){
            noticeSnackbar("success", "前の曲に戻りました。", 3000, {top: '75px'});
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
        if (data && data.progress_ms !== undefined && data.is_playing == true)  {
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
            if (data && data.progress_ms !== undefined && data.is_playing == true) {
                setProgress_ms(prevProgress => {
                    const updatedProgress = prevProgress + 500;
                    if (updatedProgress >= data.duration_ms) {
                        return data.duration_ms;
                    }
                    return updatedProgress;
                });
            }else{
                mutate(); // SWRのキャッシュを更新
            }
        }, 500);

        return () => clearInterval(interval); // クリーンアップ処理を追加
    }, [data]); // dataが変更されるたびにインターバルを設定


    // AddMusic用の関数
    const addMusic = async (track) => {
        const csrf = await fetch(`${url}/api/csrf-token`, {
            credentials: 'include', // セッション情報を含める
          })
            .then(response => response.json())
            .then(data => {
              return data.token;
            });
        console.log("CSRF Token:", csrf);
        console.log("Adding music:", track.name);
        const posturl = `${url}/api/add`;
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf,
            },
            credentials: 'include', // セッション情報を含める
            body: JSON.stringify({
            room_id: roomId,
            uri: track.uri,
            })
        };
        console.log(posturl);
        var response = await fetch(posturl, requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);

          noticeSnackbar("success", "追加しました。", 3000);
        })
        .catch((error) => {
            noticeSnackbar("error", "エラー : 追加できませんでした。", 3000);
        });

        

    }


    // Snackbarの位置調整Bottom キーボード
    let height = window.visualViewport.height;
    const viewport = window.visualViewport;
    const resizeHandler = () => {
        if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
            height = viewport.height;
        }
    
        const difference = height - viewport.height;
        var newBottom = "";
        if(difference <= 10) {
            newBottom = `${height - viewport.height + 85}px`;
        }
        else {
            newBottom = `${height - viewport.height + 10}px`;
        }
        setSnackbarPosition({ bottom: newBottom });
      };
    
      useEffect(() => {
        window.visualViewport.addEventListener("resize", resizeHandler);
        return () => window.visualViewport.removeEventListener("resize", resizeHandler);
      }, []);


    // SnackBarの位置調整 
    useEffect(() => {
        if(!opened){
            setSnackbarPosition({ bottom: '85px' });
        }else{
            setSnackbarPosition({ bottom: '490px' });
        }
      }, [opened]);
 
    
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
                            <TestDr now={data} fetchSkip={fetchSkip} setOpened={setOpened} opened={opened} isLocked={isLocked} release={release} request={request}/>
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
                            <TestDr now={data} fetchSkip={fetchSkip} setOpened={setOpened} opened={opened} isLocked={isLocked} release={release} request={request}/>

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
                            <TestDr now={data} fetchSkip={fetchSkip} setOpened={setOpened} opened={opened} isLocked={isLocked} release={release} request={request}/>
                            <History url={url} roomId={roomId}></History>
                        </>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
