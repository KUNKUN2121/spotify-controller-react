import React from 'react'
import Button from '@mui/material/Button';
// アイコンインポート
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SearchIcon from '@mui/icons-material/Search';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import QueueIcon from '@mui/icons-material/Queue';
import LyricsIcon from '@mui/icons-material/Lyrics';
import {Link} from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@mui/material';

const wapper = css`
    margin: 10px 0px;
    display: flex;
    justify-content: space-around;
`;

const btnCss = css`
    display: block;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    color: #837799;
    transition: all 2s ease 0s;`;

const iconCss =css`
    font-size: 32px;
`;


const Controller = ({now, isLight}) => {
        
    return (
        <div css={wapper}>
            <button css={btnCss}><Link to='/history'><HistoryIcon css={iconCss} 
            style={{
                color: isLight ? '#122130' : '#eee'
            }}/></Link></button>
            <button css={btnCss}><Link to='/'><QueueMusicIcon css={iconCss} 
            style={{
                color: isLight ? '#122130' : '#eee'
            }} /></Link></button>
            <button css={btnCss}><Link to='/search'><SearchIcon css={iconCss} 
            style={{
                color: isLight ? '#122130' : '#eee'
            }} /></Link></button>
        </div>
    )
}

export default Controller