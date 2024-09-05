import { Global } from '@emotion/react';
import { Button, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import TopInfo from './TopInfo';
import MusicItem from './MusicItem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const TestDr = ({now, fetchSkip, bottomDraweropen, setBottomDraweropen, isLocked, release, request, leaveRoom}) => {
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

    const drawerBleeding = 80;
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
                        padding: '16px',
                        backgroundColor: "#191919",
                    }}>
                       <iframe width="100%" height="52" src={url} frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe>
                        
                        <p style={{
                            color: "#eee",
                            marginBottom: "8px",
                        }}>次に再生</p>
                       {now.queue.map((queue, i) => {
                            return (
                                <MusicItem item={queue}></MusicItem>
                            );
                       })}
                       <div>
                            <p style={{color: 'white'}}>スリープモード</p>
                            <button type="button" onClick={() => (isLocked ? release() : request())}>
                                {isLocked ? 
                                // WakeOnLock 有効
                                    <>
                                        有効
                                        <LightbulbIcon style={{fontSize: 32,}}/>
                                    </>

                                : 
                                // WakeOnLock 無効
                                    <>    
                                        無効
                                        <LightbulbIcon style={{fontSize: 32, opacity: 0.3 }}/>
                                    </>
                                }
                            </button>
                            <Button onClick={leaveRoom}>ルーム退出</Button>
                        </div>
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    );
}

export default TestDr;
