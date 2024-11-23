import { ArrowBack } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
  } from '@mui/material';
import { SendToBackIcon } from 'lucide-react';


export default function CardGeneric({ handleClose,handleBack,backEnabled, title, children, actions }) {

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            hideBackdrop={true}
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    backgroundColor: '#084080',
                    border: '10px solid #201E1D',
                    width: '500px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '25px',
                    position: 'relative',
                    backgroundColor:'#201E1D'
                }}
            >
                {title}
                {backEnabled && (
                    <IconButton
                        aria-label="back"
                        onClick={handleBack}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: 8,
                            color: '#FFFFFF',
                            backgroundColor: '#EB2D37',
                            border: '5px #EB2D37 solid',
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent dividers sx={{ textAlign: 'left', color: '#FFFFFF' }}>
                {children}
            </DialogContent>
            {actions && (
                <DialogActions sx={{ justifyContent: 'center' }}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};