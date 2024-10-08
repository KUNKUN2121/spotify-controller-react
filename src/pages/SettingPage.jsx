import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { Button, ButtonBase, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';


const SettingPage = ({roomId}) => {
    const wapper = css`
        height: 100%;
        color: #eee;
        width: 100%;
        overflow-y: auto;
        p {
            font-size: 15px;
        }
        label {
            color: #eee;
        }
    `;

    const wapper2= css`
        width: 80%;
        margin: 0 auto;
    `;
    const panel = css`
        margin-top: 20px;
        div {
            color: #eee;
        }
        p {
            margin-top: 12px;
        }
    `;

    const infomartion = css`
        margin-top: 30px;
        p {
            font-size: 12px;
        }
        `;

    const btn = css`
        margin-top: 30px;
    `;


    // ストレージからKEYの値を取得
    function getLocalStorageStorage(key) {
        const value = localStorage.getItem(key);
        return value;
    }



    // 全てのストレージを取得
    function getAllLocalStorageStorage() {
        if(getLocalStorageStorage('delay')){
            setDelayTime(getLocalStorageStorage('delay'));
        }
        if(getLocalStorageStorage('syncTime')){
            setSyncTime(getLocalStorageStorage('syncTime'));
        }
    }

    // 全てのストレージに保存する
    function setAllSettings() {
        localStorage.setItem('delay', delay);
        localStorage.setItem('syncTime', syncTime);
    }


    // 保存ボタン押された時の処理
    function saveAndReload() {
        setAllSettings();
        reloadPage();
    }
        // 初期値ボタン押されたときの処理
    function resetBtn() {
        setDelayTime(0);
        setSyncTime('normal');
    }
    

    function reloadPage(){
        const host = window.location.host; 
        const protocol = window.location.protocol; 
        const url = `${protocol}//${host}/settings?roomId=${roomId}`;
        window.location.href = url; // リダイレクト
    }


    const [delay, setDelayTime] = useState(0);
    const [syncTime, setSyncTime] = useState('normal');


        
    function valuetext(value) {
        return `${value}°C`;
      }
      useEffect(() => {
        getAllLocalStorageStorage();
      }, [])
      
    return (
        <div css={wapper}>
            <div css={wapper2}>
                <p>設定</p>
                {/* 遅延計算 */}
                <div css={panel}>
                    {/* <p>遅延時間</p> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">遅延時間の設定</InputLabel>
                        <Select
                            labelStyle={{ color: '#ff0000' }}
                            sx={{
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={delay}
                            label="遅延時間"
                            onChange={(event) => {
                                setDelayTime(event.target.value);
                            }}
                        >
                            <MenuItem value={0}>推奨 : 端末の時間から計算</MenuItem>
                            <MenuItem value={1}>不安定 : その他の方法から計算</MenuItem>
                            <MenuItem value={2}>非推奨 : 遅延の計算をしない</MenuItem>
                        </Select>
                    </FormControl>
                    <p>
                        端末の時刻設定が正確でない場合は
                        <br />
                        【その他の方法から計算】を選択してください。
                        <br />
                        <br />
                        【遅延の計算をしない】は非推奨です。
                    </p>
                </div>
                
                {/* 同期時間 */}
                <div css={panel}>
                    {/* <p>同期時間</p> */}
                    <FormControl fullWidth>
                        <InputLabel id="syncTime">同期時間の設定</InputLabel>
                        <Select
                            labelStyle={{ color: '#ff0000' }}
                            sx={{
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }}
                            labelId="syncTime"
                            id="demo-simple-select"
                            value={syncTime}
                            label="同期時間の設定"
                            onChange={(event) => {
                                setSyncTime(event.target.value);
                            }}
                        >
                            <MenuItem value={'low'}>低速 : 5秒間隔で同期</MenuItem>
                            <MenuItem value={'normal'}>通常 : 2.5秒間隔で同期</MenuItem>
                            <MenuItem value={'high'}>高速 : 1秒間隔で同期</MenuItem>
                        </Select>
                    </FormControl>
                    <p>サーバーと通信する時間を選択できます。</p>
                    <p>高速にすると、通信容量が増えます。</p>
                </div>
                
                <div css={infomartion}>
                    <p>設定情報は自動で保存されます。</p>
                    <p>※設定情報は再読み込み後に適応されます。</p>
                </div>

                <div style={{
                            marginTop: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                    }}>
                         <Button onClick={resetBtn} variant="contained">初期値にリセット</Button>
                    <Button onClick={saveAndReload} variant="contained"  style={{ marginTop: '10px', }}
                    >保存</Button>
                   
                </div>
                </div>
        </div>
    )
}

export default SettingPage