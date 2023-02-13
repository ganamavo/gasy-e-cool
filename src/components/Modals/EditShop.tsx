import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useFormik } from "formik";
import { ImageListType } from "react-images-uploading";

import DialogTitle from '../../UI/DialogueTitle';
import { editSingleShop } from '../../actions/shop';
import EditShopForm from '../Forms/EditShop';
import { Shop } from '../Cards/ShopCard';
import { ShopSchema } from '../Forms/AddShop';

interface EditShopProps {
    open: boolean;
    onClose: () => void;
    data: Shop;
}

const EditShopModal: React.FC<EditShopProps> = ({ open, onClose, data }) => {
    const [image, setImage] = useState<ImageListType>([{ dataURL: data.image_url }]);
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: data,
        validationSchema: ShopSchema,
        onSubmit: (values, { resetForm }) => {
            values.image_url = image[0]?.dataURL || data.image_url
            // @ts-ignore
            dispatch(editSingleShop(data.id, values));
            setImage([]);
            resetForm({ values: undefined });
        },
    });
    
    const handleImageUpload = (imageList: ImageListType) => {
        setImage(imageList);
    };

    const { errors, isSubmitting, handleSubmit } = formik;

    return (
        <Dialog
            fullWidth
            maxWidth='md'
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
                Update Shop Details
            </DialogTitle>
            <DialogContent dividers>
                <EditShopForm formik={formik} handleImageUpload={handleImageUpload} image={image} />
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
                            handleSubmit();
                            onClose();
                        }}
                        sx={{ height: '40px' }}
                        disabled={isSubmitting || !errors}
                    >
                        Save
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default EditShopModal;