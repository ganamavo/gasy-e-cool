import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Box, Stack, TextField, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from "formik";
import ImageUploading, { ImageListType } from "react-images-uploading";

import DialogTitle from '../../UI/DialogueTitle';
import { Product } from '../Cards/ProductCard';
import { ProductSchema } from '../Forms/AddProduct';
import { editSingleProduct } from '../../actions/product';
import EditProductForm from '../Forms/EditProduct';

interface EditProductProps {
    open: boolean;
    onClose: () => void;
    data: Product;
}

const EditProductModal: React.FC<EditProductProps> = ({ open, onClose, data }) => {
    const [image, setImage] = useState<ImageListType>([{ dataURL: data.image_url }]);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: data,
        validationSchema: ProductSchema,
        onSubmit: async(values, { resetForm }) => {
            values.image_url = image[0]?.dataURL || data.image_url
            // @ts-ignore
            dispatch(editSingleProduct(data.id, values));
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
                Edit Product Details
            </DialogTitle>
            <DialogContent dividers>
                <EditProductForm formik={formik} handleImageUpload={handleImageUpload} image={image} />
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

export default EditProductModal;