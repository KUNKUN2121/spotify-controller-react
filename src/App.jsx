import { BrowserRouter, Route , Routes} from "react-router-dom";
import Home from "./pages/Home";
import ProgressBar from "./pages/ProgressBar";
import './index.css';
import Lyrics from "./pages/Lyrics";
import TopInfo from "./pages/TopInfo";

import emotionReset from "emotion-reset";
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { useEffect, useState } from "react";
import useSWR from 'swr'



function App() {
    console.log("親コンポーネント");

    // API取得

    const url = process.env.REACT_APP_BASE_URL;

    var roomId =  process.env.REACT_APP_ROOM_ID;

    const [now, setNow] = useState();


    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data, error, isLoading } = useSWR(
        'http://100.73.31.2/api/now?room_id=312hqad47ewc5ps4cnmegsnoivfy',
        fetcher,
        {refreshInterval:1000})

    if (error) return 'aa';
    if (isLoading) return <div>loading...</div>
    // データをレンダリングする

  return (
    <>
    <Global
        styles={css`
            ${emotionReset}
        `}
    />
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
                <>
                <ProgressBar now={data}/>
                {/* <TopInfo title={data.title} artists={data.artists}/> */}
                <TopInfo now={data}/>
                <Lyrics props={'aaa'}/>
                </> } />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
