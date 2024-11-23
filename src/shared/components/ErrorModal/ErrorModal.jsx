import React from 'react';
import { Dialog, DialogContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ErrorModal.css';

export default function ErrorModal({ open, onClose, errorMessage }) {
    return (
        <>
            {open && <div className="modal-overlay" />}
            <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
                <div className="modal-content">
                    <div className="modal-header">
                        <IconButton className="close-button" onClick={onClose}>
                            <CloseIcon className="octagon-icon" />
                        </IconButton>
                    </div>
                    <DialogContent>
                        <Typography variant="h6" className="modal-message">
                            {errorMessage}
                        </Typography>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
};
