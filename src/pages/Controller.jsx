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

const Controller = ({now}) => {
        
    return (
        <div css={wapper}>
            <button css={btnCss}><Link to='/history'><HistoryIcon style={{fontSize: 32}}/></Link></button>
            <button css={btnCss}><Link to='/'><QueueMusicIcon style={{fontSize: 32}} /></Link></button>
            <button css={btnCss}><Link to='/search'><SearchIcon style={{fontSize: 32}} /></Link></button>
        </div>
    )
}

export default Controller