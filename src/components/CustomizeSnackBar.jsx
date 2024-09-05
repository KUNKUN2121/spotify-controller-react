import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

import React from 'react'
import { useSnackBar } from '../hooks/useSnackBar';

const CustomizeSnackBar = () => {
    const { open, snackbarSeverity, snackbarMessage, snackbarTimer, snackbarPosition,setSnackbarPosition, noticeSnackbar, setOpen , handleClose } = useSnackBar();

  return (
    <Snackbar
        anchorOrigin={{
            //  vertical : "top", horizontal: "center" 
            vertical: snackbarPosition.bottom ? 'bottom' : 'top',
            horizontal : "center",
        }}
        open={open} 
        autoHideDuration={snackbarTimer} 
        onClose={handleClose}
        style={{position: 'fixed', ...snackbarPosition }}
        // sx={{ bottom: { xs: 90, sm: 0 } }}
    >
        <MuiAlert
            // onClose={handleSnackbarClose} 
            severity={snackbarSeverity} 
            sx={{ width: '100%' }}
            >
        {snackbarMessage}
        </MuiAlert>
    </Snackbar>
  )
}

export default CustomizeSnackBar