import React, { useState } from 'react'
import { Lrc, useRecoverAutoScrollImmediately  } from 'react-lrc';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { height } from '@mui/system';

const Lyrics = ({now, progress_ms, isLight}) => {

    const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

    // ボタンのクリックハンドラ
    const handleRecoverAutoScrollClick = () => {
      recoverAutoScrollImmediately();
    };

    const blackColor = "#122130";
    const whiteColor = "#eee";

    const lineRenderer = ({ index, active, line}) => {
        return (
            <p
                key={index}
                style={{
                    color: isLight ? blackColor : whiteColor,
                    opacity: active ? 1 : 0.15,
                    transition: 'opacity 0.3s ease, color 0.3s ease',
                    fontSize: '34px',
                    // textAlign: 'center',
                    // fontWeight: active ? 'bold' : 'normal',
                    fontWeight: 'bold',
                    marginTop: '34px',
                    width: '100%',
                    
                    // ここにアニメーション
                }}
            >
                {line.content}
            </p>
        );
    };
    const lineRendererNoSync = ({ index, active, line}) => {
        return (
            <p
                key={index}
                style={{
                    color: isLight ? blackColor : whiteColor,
                    opacity: '0.9',
                    transition: 'opacity 0.5s ease, color 0.3s ease',
                    fontSize: '30px',
                    textAlign: 'center',
                }}
            >
                {line.content}
            </p>
        );
    };
    const autoScrollChangeFunction = (event) => {
        if (event.autoScroll !== undefined) {
            if(event.autoScroll != autoScrollEnabled){
                setAutoScrollEnabled(event.autoScroll);
                console.log("実行しました。")
            }
            
        }
    };
    const lrcStyle = {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto'  // 縦方向のスクロールを有効にする
    };

    const wapper = css`
        /* height: 20%; */
        /* overflow: auto; */
  
        /* background-color: #302d2d; */
        /* flex-shrink: 0; */
        position: relative;

        display: flex;
        flex-direction: column;
        overflow: auto;
        margin: 0px 24px 16px;
        &::-webkit-scrollbar {
            display: none; /* スクロールバー非表示 */
        }
        
    `;

    const lrc = css`
        width: 100%;
        flex: 1;
        overflow-y: auto; 
        /* スクロールバー非表示用*/
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE11 */
        /* overflow-wrap: break-word; */
    `;

    const enableAutoLyricsBtn = css`
        border: none;
        cursor: pointer;
        width: 55px;
        height: 55px;
        color: white;
        background: #837799;
        border-radius: 55px;
        position: absolute;
        /* bottom: 10px; */
        top: 10px;
        right: 0px;
        opacity: 0.6;
        z-index: 1000;
    `;

    const noLyrics = css`
        width: 100%;
        height: 100%;
        display: flex;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #eee;
        margin-top: 24px;
    `;
    return (    
        <div css={wapper}>
            {/* <button type="button" onClick={recoverAutoScrollImmediately}> */}
                {/* recover auto scroll immediately
            </button> */}
            {!autoScrollEnabled && now.lyrics.response == 200 && (
                <button type="button" css={enableAutoLyricsBtn} onClick={handleRecoverAutoScrollClick}>
                    <KeyboardReturnIcon />
                </button>
                
            )}
            {now.lyrics.response == 200 ? 
                <Lrc
                     topBlank
                    //  verticalSpace={true}
                    css={lrc}
                     lrc={now.lyrics.syncedLyrics}
                     currentMillisecond={progress_ms}
                     lineRenderer={lineRenderer}
                     recoverAutoScrollInterval={50000}
                     recoverAutoScrollSingal={signal}
                     onAutoScrollChange={autoScrollChangeFunction}
                     style={lrcStyle}
                 />
            : now.lyrics.response == 201 ?  
                <Lrc 
                    topBlank
                    // verticalSpace={true}
                    css={lrc}
                    lrc={now.lyrics.syncedLyrics}
                    currentMillisecond="-1"
                    lineRenderer={lineRendererNoSync}
                    style={lrcStyle}
                />
            :                 
                <div css={noLyrics}>
                    <p>この曲には歌詞がありません。</p>
                </div>
            }
        </div>
    )
}

export default Lyrics