import React from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';

import DialogTitle from '../../UI/DialogueTitle';

interface ConfirmDeletionProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
}

const ConfirmDeletion: React.FC<ConfirmDeletionProps> = ({ open, onClose, title, onDelete }) => {
  
    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            onClose={onClose}
            open={open}
            sx={{
                '& .MuiDialogContent-root': {
                    padding: '2rem'
                },
                '& .MuiDialogActions-root': {
                    padding: '1rem'
                }
            }}
        >
            <DialogTitle onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <Alert severity='warning'>
                    This action is irrevesible which causes a forever deletion😢.
                    Do you still wish to continue?
                </Alert>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Box display='flex' alignItems='center' gap={2}>
                    <Button
                        variant='text'
                        onClick={onClose}
                        sx={{ height: '40px' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => {
                            onDelete();
                            onClose();
                        }}
                        color='error'
                        sx={{ height: '40px' }}
                    >
                        Delete
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDeletion;