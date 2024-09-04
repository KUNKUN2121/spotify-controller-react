import { Global } from '@emotion/react';
import { Button, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import TopInfo from './TopInfo';
import MusicItem from './MusicItem';

const TestDr = ({now, fetchSkip, opened, setOpened}) => {
    var url = `https://odesli.co/embed?url=https%3A%2F%2Fsong.link%2Fs%2F${now.links['song-id']}&theme=dark`;
    

    const toggleDrawer = () => () => {
        setOpened(!opened);
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
                open={opened}
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
                       
                    </div>
                </div>
            </SwipeableDrawer>
        </div>
    );
}

export default TestDr;
