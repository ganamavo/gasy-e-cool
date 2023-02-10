import React from 'react';
import { DialogTitle as MuiDialogTitle, DialogTitleProps as MuiDialogTitleProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps extends MuiDialogTitleProps {
		children?: React.ReactNode;
		onClose?: () => void;
}

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
    const { children, onClose, sx, ...other } = props;

    return (
        <MuiDialogTitle
            sx={{
                ...sx,
                m: 0,
                p: 2
            }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

export default DialogTitle;