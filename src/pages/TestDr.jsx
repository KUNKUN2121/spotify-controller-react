/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { Button, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import TopInfo from './TopInfo';
import MusicItem from './MusicItem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeOffIcon from '@mui/icons-material/BedtimeOff';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DrawerQueueItem from '../components/DrawerQueueItem';
const TestDr = ({now, fetchSkip, bottomDraweropen, setBottomDraweropen, isLocked, release, request, leaveRoom, roomId, isDarkMode, setIsDarkMode}) => {
    var url = `https://odesli.co/embed?url=https%3A%2F%2Fsong.link%2Fs%2F${now.links['song-id']}&theme=dark`;
    

    const toggleDrawer = () => () => {
        setBottomDraweropen(!bottomDraweropen);
    };

    const beforeEnter = () => {
        console.log('beforeEnter');
    };
    
    const afterEnter = () => {
        console.log('afterEnter');
    };
    
    const beforeLeave = () => {
        console.log('beforeLeave');
    };
    
    const afterLeave = () => {
        console.log('afterLeave');
    };
    
    const scrollDrawer = () => {
        console.log('scrollDrawer');
    };


    const controllers = css`
        display: flex;
        color: #eee;
        justify-content: space-around;
        margin-top: 16px;
    `;

    const controller = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width : calc(100% / 3) ;
    `;
    const drawerBleeding = 80;


    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    const confirmLeaveRoom = () => {
        if(window.confirm("ルームを退出しますか？")) {
            leaveRoom();
        }
    }
    return (
        <div>
                  <Global
                    styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(50% -${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                    }}
      />


            <SwipeableDrawer
                open={bottomDraweropen}
                anchor="bottom"
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div>
                    {/* 常に表示される部分 */}
                    <div style={{
                        backgroundColor: "#122130",
                        position: "absolute",
                        top: `-${drawerBleeding}px`,
                        height: `${drawerBleeding}px`,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility : 'visible',
                        right: 0,
                        left: 0,
                        zIndex: 1,
                    }}>
                        <TopInfo now={now} fetchSkip={fetchSkip} drawerBleeding={drawerBleeding}/>
                    </div>

                    {/* スクロールされるコンテンツ */}
                    <div style={{
                        height: '50vh',
                        overflowY: 'auto',
                        padding: '0 16px',
                        backgroundColor: "#191919",
                    }}>

                         {/* <p style={{margin: "24px 0"}}>
                            アルバム: {now.album}
                        </p> */}

                        {/*  */}
                        <p style={{
                            margin: "24px 0",
                            color: "#eee",
                            marginBottom: "8px",
                        }}>次に再生</p>
                       {now.queue.map((queue, i) => {
                            return (
                                <DrawerQueueItem item={queue}></DrawerQueueItem>
                            );
                       })}
                       <div>
                            <div css={controllers}>
                                <div css={controller} onClick={() => (isLocked ? release() : request())}>
                                    {isLocked ? <LightbulbIcon fontSize="large"/> : <LightbulbIcon fontSize="large" style={{opacity: 0.3 }}/> }
                                    <p>常時ON</p>
                                </div>
                                <div css={controller} onClick={toggleDarkMode}>
                                    {isDarkMode ? <BedtimeIcon fontSize="large"/> : <BedtimeIcon fontSize="large" style={{opacity: 0.3 }}/>}
                                    {/* <p>{isDarkMode ? "ダークモード" : "ライトモード"}</p> */}
                                    <p>ダークモード</p>
                                </div>
                                <div css={controller} onClick={confirmLeaveRoom}>
                                    <LogoutIcon fontSize="large"/>
                                    <p>退出</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    );
}

export default TestDr;
