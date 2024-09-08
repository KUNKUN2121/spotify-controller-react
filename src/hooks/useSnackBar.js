import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState, useRef } from "react";
import useSWR from 'swr';

export const useSnackBar = ({bottomDraweropen}) => {
    // SnackBar
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarTimer, setSnackbarTimer] = useState(6000);
    const [snackbarPosition, setSnackbarPosition] = useState({'bottom': '0px'});

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false)
      };

      const noticeSnackbar = (severity, message, timer ) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarTimer(timer);
        handleOpen();
    }

    // Snackbarの位置調整Bottom キーボード
    let height = window.visualViewport.height;
    const viewport = window.visualViewport;
    const resizeHandler = () => {
        if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
            height = viewport.height;
        }
    
        const difference = height - viewport.height;
        var newBottom = "";
        if(difference <= 10) {
            newBottom = `${height - viewport.height + 85}px`;
        }
        else {
            newBottom = `${height - viewport.height + 10}px`;
        }
        setSnackbarPosition({ bottom: newBottom });
      };
    
      useEffect(() => {
        window.visualViewport.addEventListener("resize", resizeHandler);
        return () => window.visualViewport.removeEventListener("resize", resizeHandler);
      }, []);


    // SnackBarの位置調整 
    useEffect(() => {
        if(!bottomDraweropen){
            setSnackbarPosition({ bottom: '85px' });
        }else{
            // setSnackbarPosition({ bottom: '565px' });
            setSnackbarPosition({ bottom: 'calc(50vh + 80px + 10px)' });
        }
      }, [bottomDraweropen]);



    return { open, snackbarSeverity, snackbarMessage, snackbarTimer, snackbarPosition, setSnackbarPosition, noticeSnackbar, setOpen, handleClose};
    
}