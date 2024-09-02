
import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const wapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;

const bar = css`
    border-radius: 30%;
    width: 100%;
    height: 8px;
    background: #837799;
    background: linear-gradient(#604498, #604498) no-repeat #837799;
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


const ProgressBar = () => {
    return (
        <div css={wapper}>
            <div css={bar}></div>
            
            <div css={timeWapper}>
                <p css={time}>00:00</p>
                <p css={time}>00:00</p>
            </div>
        </div>

    )
}

export default ProgressBar