import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Box, Stack, TextField, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from "formik";
import ImageUploading, { ImageListType } from "react-images-uploading";

import DialogTitle from '../../UI/DialogueTitle';
import { Product } from '../Cards/ProductCard';
import { ProductSchema } from '../Forms/PostProduct';
import { editSingleProduct } from '../../actions/product';

interface EditProductProps {
    open: boolean;
    onClose: () => void;
    data: Product;
}

const EditProduct: React.FC<EditProductProps> = ({ open, onClose, data }) => {
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

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

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
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate>
                        <Stack gap={3}>
                            <Box>
                                <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="text"
                                    label="Product Name"
                                    size="small"
                                    {...getFieldProps("name")}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="text"
                                    label="Description"
                                    multiline
                                    {...getFieldProps("description")}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Box>
                            <Stack>
                                <ImageUploading
                                    value={image}
                                    onChange={handleImageUpload}
                                    maxNumber={1}
                                >
                                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <Box>
                                            <Button
                                                sx={isDragging ? { color: "red" } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                variant='contained'
                                                size="small"
                                            >
                                                Upload an image or Drop here
                                            </Button>
                                            {!!imageList?.length && imageList.map((image, index) => (
                                                <Box key={index} marginTop={2} className="image-item">
                                                    <img src={image.dataURL} alt="" width="400" />
                                                    <Box className="image-item__btn-wrapper">
                                                        <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </ImageUploading>
                            </Stack>
                            <Stack gap={3}>
                                <Box display='flex' flexDirection='row' gap={2}>
                                    <TextField
                                        fullWidth
                                        autoComplete="off"
                                        type="text"
                                        label="First Name"
                                        size="small"
                                        {...getFieldProps("owner_first_name")}
                                        error={Boolean(touched.owner_first_name && errors.owner_first_name)}
                                        helperText={touched.owner_first_name && errors.owner_first_name}
                                    />
                                    <TextField
                                        fullWidth
                                        autoComplete="off"
                                        type="text"
                                        label="Last Name"
                                        size="small"
                                        {...getFieldProps("owner_last_name")}
                                        error={Boolean(touched.owner_last_name && errors.owner_last_name)}
                                        helperText={touched.owner_last_name && errors.owner_last_name}
                                    />
                                </Box>
                                <Box display='flex' flexDirection='row' gap={2}>
                                    <TextField
                                        fullWidth
                                        autoComplete="username"
                                        type="email"
                                        label="Email Address"
                                        size="small"
                                        {...getFieldProps("owner_email")}
                                        error={Boolean(touched.owner_email && errors.owner_email)}
                                        helperText={touched.owner_email && errors.owner_email}
                                    />
                                    <TextField
                                        fullWidth
                                        autoComplete="off"
                                        type="tel"
                                        label="Phone Number"
                                        size="small"
                                        {...getFieldProps("owner_phone_number")}
                                        error={Boolean(touched.owner_phone_number && errors.owner_phone_number)}
                                        helperText={touched.owner_phone_number && errors.owner_phone_number}
                                    />
                                </Box>
                                <Stack>
                                    <TextField
                                        fullWidth
                                        autoComplete="off"
                                        type="price"
                                        label="Price"
                                        size="small"
                                        {...getFieldProps("price")}
                                        error={Boolean(touched.price && errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Form>
                </FormikProvider>
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

export default EditProduct;