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


function App() {





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
                <ProgressBar />
                <TopInfo />
                <Lyrics />
                </> } />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
