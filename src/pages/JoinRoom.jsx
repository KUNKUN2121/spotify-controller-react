/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import React, { useState } from 'react'

const wapper = css`
    width: 80%;
    margin: 0 auto;
    color: #eee;
`;

const inputCss = css`
    width: 100%;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
`;

const inputArea = css`
    margin-top: 40px;
`;




const JoinRoom = ({messeage}) => {
    console.log(messeage);
    sessionStorage.setItem('roomId', null); 
    const [inputText, setInputText] = useState("");
    const inputChanged = (e) => {
        if(e.target.value !== "") 
        setInputText(e.target.value);
      };
    const submit = () => {
        if(inputText === "") return;
        sessionStorage.setItem('roomId', inputText); 
        document.location.href="/?roomId="+inputText;
    }
    
    return (
        <div css={wapper}>
            <h1>ルームに参加</h1>
            <p>{messeage}</p>
            <p>招待リンクを再度開く または、</p>
            <p>ルームコードを入力してください。</p>
            <div css={inputArea}>
                <label>ルームコードから参加する。</label>
                <input type="text"
                css={inputCss}
                value={inputText}
                onChange={inputChanged}
                />
                <Button onClick={submit}>参加する</Button>
            </div>
        </div>
    )
}

export default JoinRoom