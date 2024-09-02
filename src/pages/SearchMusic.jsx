import { Button, Drawer, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react'

const SearchMusic = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
      };

      const [opened, setOpened] = useState(false);

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
        console.log('scrollDrrawer')
      };


      const DrawerList = (
        <div>
            aa
        </div>
      );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            {/* <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer> */}
            <button
                onClick={() => setOpened(true)}
            >aa</button>

            <SwipeableDrawer
                open={opened}
                anchor="bottom" // Set the anchor to "bottom"
                speed={300}
                easingType="easeOutCubic"
                onClose={() => setOpened(false)}
                onBeforeEnter={() => beforeEnter()}
                onAfterEnter={() => afterEnter()}
                onBeforeLeave={() => beforeLeave()}
                onAfterLeave={() => afterLeave()}
                onScroll={() => scrollDrawer()}
                swipeAreaWidth={500}
            >
                <div style={{
                    position: "absolute",
                    // top: -50,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: "visible",
                    right: 0,
                    left: 0,
                }}>
                    <div style={{
                        position: "absolute",
                        top: -50,
                        paddingTop: '50px',
                        height: '50px',
                        backgroundColor: 'red'
                    }}></div>
                    contentsddd<br />
                    contentsddd<br />
                    contentsddd<br />
                    contentsddd<br />
                </div>
            </SwipeableDrawer>
        </div>
    )
}
;
export default SearchMusic