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
    width: 70%;
    margin: 12px auto;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    font-size: 16px;
`;

const inputArea = css`
    display: flex;
    margin-top: 40px;
    width: 100%;
    align-items: center;
`;

const errorMessageStyle = css`
    padding: 8px 4px;
    background-color: #494949;
    text-align: center;
    color: #ff8989;
`;

const submitDivStyle = css`
    margin-top: 16px;
    width: 100%;
`;

const sumibtStyle = css`
    width: 100%;
`;



const JoinRoom = ({response = null}) => {
    sessionStorage.setItem('roomId', null); 
    const [inputText, setInputText] = useState("");
    const inputChanged = (e) => {
        const newValue = e.target.value;
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(newValue)) {
            setInputText(newValue);
        }
    };
    const submit = () => {
        if(inputText === "") return;
        
        sessionStorage.setItem('roomId', inputText); 
        document.location.href="/?roomId="+inputText;
    }
    
    return (
        <div css={wapper}>
            <h1>ルームに参加</h1>
            {response !== null ?  
                response === 404 ? <div css={errorMessageStyle}>ルームが見つかりませんでした。</div> : 
                <div css={errorMessageStyle}>エラーが発生しました。<br/> 再度参加してください。</div>

            : ""}
            <p>招待リンクを再度開く または、</p>
            <p>ルームコードを入力してください。</p>
            <div css={inputArea}>
                <label>コード</label>
                <input type="url"
                    css={inputCss}
                    value={inputText}
                    onChange={inputChanged}
                />
            </div>

            <div css={submitDivStyle}>
                <Button onClick={submit} css={sumibtStyle} variant="outlined">参加する</Button>
            </div>
        </div>
    )
}

export default JoinRoom