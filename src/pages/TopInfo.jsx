import { Skeleton } from '@mui/material';
import React from 'react'

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

const title = css`
    font-size: 24px;
    color: white;
`;

const artists = css`
    color: white;
    
    &::after {
        content: ", ";
    }

    &:last-child::after {
    content: "";
    }
`;

const TopInfo = () => {
  return (
    <div css={wapper}>
        <Skeleton variant="rectangular" width={60} height={60} className="album-art-skeleton" />

        <div css={infoWapper}>
            <div css={title}>これはテストです。</div>
            <div css={artists}><p>aa</p></div>
        </div>
    </div>
  )
}

export default TopInfo