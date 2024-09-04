
import React, {memo, useEffect, useRef, useState} from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const getDelay = (data) =>{
    const getSpotifyTime = new Date(data.get_spotify_timestamp);
    const currentDate = new Date();
    return currentDate.getTime() - getSpotifyTime.getTime();
}


const convertTimeView = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
};

const wapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;



const timeWapper = css`
    margin: 2px 6px 0px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`;

const time = css`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    color: #eee;
`;

const bar = css`
    border-radius: 30%;
    width: 100%;
    height: 8px;
    background: #837799;
    background: linear-gradient(#604498, #604498) no-repeat #837799;
`;


const ProgressBar = ({now, progress_ms}) => {

    return (
        <div css={wapper}>
            <div css={bar} style={{
                backgroundSize: `${(now ? (progress_ms / now.duration_ms) * 100 : 0)}%`,
            }} />
            
            <div css={timeWapper}>
                <p css={time}>{convertTimeView(progress_ms)}</p>
                <p css={time}>{convertTimeView(now.duration_ms)}</p>
            </div>
            
        </div>

    )
};

export default ProgressBar