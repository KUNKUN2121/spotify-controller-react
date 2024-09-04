import { Skeleton } from '@mui/material';
import React, { memo, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'


/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


function PullRelease({ children, fetchSkip}) {
    const [{ x }, api] = useSpring(() => ({ x: 0 }));

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(
        ({ down, movement: [mx], direction: [dx] }) => {
            api.start({ x: down ? mx : 0 });

            if (!down) {
                if (dx > 0) {
                    console.log("右にスワイプ");
                    fetchSkip('previous')
                } else if (dx < 0) {
                    console.log("左にスワイプ");
                    fetchSkip('next')
                }
            }
        },
        { axis: 'x' }
    );

    return (
        <animated.div
            {...bind()}
            style={{
                x,
                touchAction: 'pan-y', // Y軸でのスクロールを許可
                display: 'flex',
                flexShrink: 0,  /* 高さ固定 */
                height: `80px`,
                width: '100%',
                gap: '10px',
                alignItems: 'center',
            }}
        >
            {children}
        </animated.div>
    );
}





const infoWapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
`;

const AlbumArt = css`
    margin-left: 16px;
    height: 80%;
`;
const titleCss = css`
    font-size: 16px;
    color: white;
`;

const artists = css`
    color: white;
    display: flex;
    font-size: 14px;
`;

const artistCss = css`    
    &::after {
        content: ", ";
    }

    &:last-child::after {
    content: "";
    }
`;
// style={{height: `${drawerBleeding}px`}
const areEqual = (prevProps, nextProps) => {
    return prevProps.now.links['song-id'] === nextProps.now.links['song-id'];
}

const TopInfo = memo(({ now, fetchSkip, drawerBleeding } ) => {
    console.log("TopInfo~!!!")
    return (
        <PullRelease fetchSkip={fetchSkip}>
            
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
        </PullRelease>
    )
}, areEqual)



export default TopInfo