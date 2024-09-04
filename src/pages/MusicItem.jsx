/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'






const wapper = css`
    width: 100%;
    height: 70px;
    background-color: #000000;
    border: 1px solid #565656;
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


const artistCss = css`    
    &::after {
        content: ", ";
    }

    &:last-child::after {
    content: "";
    }
`;

const MusicItem = ({item}) => {






    
  return (
    <div css={wapper}>
        <img src={item.album.images[2].url} style={{height : '100%'}} alt="" />
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

export default MusicItem