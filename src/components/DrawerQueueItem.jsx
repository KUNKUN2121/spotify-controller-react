/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'

const wapper = css`
    width: 100%;
    height: 50px;
    color: #eee;
    display: flex;
`;

const titleArtistWapper = css`
    margin-left: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const artistsC = css`
    display: flex;
`;

const albumArt = css`
    height: 80%;
    margin: auto 0;
`;
const artistCss = css`    
    &::after {
        content: ", ";
    }

    &:last-child::after {
    content: "";
    }
`;
const DrawerQueueItem = ({item}) => {
  return (
    <div css={wapper}>
        <img src={item.album.images[2].url} css={albumArt} alt="" />
        <div css={titleArtistWapper}>
            <p className="title">{item.name}</p>
            <div css={artistsC}>
                {item.artists.map((artist) => (
                    <p key={artist.id} css={artist}>{artist.name}</p>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DrawerQueueItem