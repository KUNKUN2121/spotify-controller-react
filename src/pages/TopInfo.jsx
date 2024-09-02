import { Skeleton } from '@mui/material';
import React, { memo } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const wapper = css`
    display: flex;
    flex-shrink: 0;  /* 高さ固定 */
    height: 60px;
    width: 100%;
    gap: 10px;
    margin-top: 8px;
`;


const infoWapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
`;

const AlbumArt = css`
    margin-left: 16px;
    height: 100%;
`;
const titleCss = css`
    font-size: 24px;
    color: white;
`;

const artists = css`
    color: white;
    display: flex;
`;

const artistCss = css`    
    &::after {
        content: ", ";
    }

    &:last-child::after {
    content: "";
    }
`;

const areEqual = (prevProps, nextProps) => {
    // propsの比較処理
    return prevProps.now.links['song-id'] === nextProps.now.links['song-id'];
}

const TopInfo = memo(({ now } ) => {
    console.log("TopInfo~!!!")
    return (
        <div css={wapper}>
          <img css={AlbumArt} src={now.links["album-art"]} alt="Album Art" />

            <div css={infoWapper}>
                <div css={titleCss}>{now.title}</div>
                <div css={artists}>
                    {            
                        now.artists.map((artist, index) => (
                        <p key={index} css={artistCss}>{artist.name}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}, areEqual)



export default TopInfo