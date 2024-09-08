import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { Button, ButtonBase, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';


const SettingPage = () => {
    const wapper = css`
        margin: 0 auto;
        width: 80%;
        height: 100%;
        color: #eee;
        p {
            margin-top: 12px;
            font-size: 16px;
        }
        label {
            color: #eee;
        }


    `;
    const panel = css`
        margin-top: 20px;
        div {
            color: #eee;
        }
    `;

    const infomartion = css`
        margin-top: 30px;
        p {
            font-size: 12px;
        }
        `;



    // ストレージからKEYの値を取得
    function getLocalStorageStorage(key) {
        const value = localStorage.getItem(key);
        return value;
    }

    // ストレージに値をセット
    function setSettings(key, value) {
        localStorage.setItem(key, value);
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




    const [delay, setDelayTime] = useState(0);
    const [syncTime, setSyncTime] = useState('normal');

    function valuetext(value) {
        return `${value}°C`;
      }
      useEffect(() => {
        getAllLocalStorageStorage();
      }, [])
      
      function reloadPage() {
        window.location.reload();
      }
    return (
        <div css={wapper}>
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
                            setSettings('delay', event.target.value);
                        }}
                    >
                        <MenuItem value={0}>推奨 : 端末の時間から計算</MenuItem>
                        <MenuItem value={1}>不安定 : その他の方法から計算</MenuItem>
                        <MenuItem value={2}>非推奨 : 遅延の計算をしない</MenuItem>
                    </Select>
                </FormControl>
                <p>
                    デフォルトは、【端末の時間から計算】です。<br />
                    端末の時刻設定が正確でない場合は、正確な計算が出来ないため、【その他の方法から計算】を選択してください。<br />
                    【その他の方法から計算】は不安定な場合があります。
                    その場合は、【遅延の計算をしない】を選択してください。
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
                            setSettings('syncTime', event.target.value);
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
                }}>
                <Button onClick={reloadPage} variant="contained" >再読み込み</Button>

            </div>
        </div>
    )
}

export default SettingPage