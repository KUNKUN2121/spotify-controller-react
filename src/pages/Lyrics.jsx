import React, { useState } from 'react'
import { Lrc, useRecoverAutoScrollImmediately  } from 'react-lrc';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { height } from '@mui/system';

const Lyrics = ({now, progress_ms}) => {

    const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

    // ボタンのクリックハンドラ
    const handleRecoverAutoScrollClick = () => {
      recoverAutoScrollImmediately();
    };

    

    const lineRenderer = ({ index, active, line}) => {
        return (
            <p
                key={index}
                style={{
                    color: active ? 'white' : '#686D76',
                    transition: 'color 0.3s ease',
                    fontSize: '30px',
                    // textAlign: 'center',
                    paddingTop: '8px',
                    width: '100%',
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
                    color: 'white',
                    opacity: '0.9',
                    transition: 'color 0.3s ease',
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
                <div className="no-lyrics">
                    <p>この曲には歌詞がありません。</p>
                </div>
            }
        </div>
    )
}

export default Lyrics