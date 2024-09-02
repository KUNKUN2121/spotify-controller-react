import React from 'react'
import { Lrc, useRecoverAutoScrollImmediately  } from 'react-lrc';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Lyrics = () => {

    const wapper = css`
        background-color: #302d2d;
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: auto;
        margin: 0px 24px 16px;
    `;
    return (
        <div css={wapper}>Lyrics</div>
    )
}

export default Lyrics