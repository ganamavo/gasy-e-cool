import React from 'react';
import { Box, Stack, TextField, Button } from '@mui/material';
import { Form, FormikProvider } from "formik";
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { DEFAULT_IMAGE } from '../../constants';

interface EditProductProps {
   formik: any;
   image: ImageType[];
   handleImageUpload: (imageList: ImageListType) => void;
}

const EditProductForm: React.FC<EditProductProps> = ({ formik, image, handleImageUpload }) => {

    const { errors, touched, getFieldProps, values } = formik;

    return (
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
                                    {!imageList?.length && (
                                        <Button
                                            sx={isDragging ? { color: "red" } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            variant='contained'
                                            size="small"
                                        >
                                            Upload an image or Drop here
                                        </Button>
                                    )}
                                    {!!imageList?.length && imageList.map((image, index) => (
                                        <Box key={index} marginTop={2} className="image-item">
                                            <img src={image.dataURL} alt="" width="400" />
                                            <Box className="image-item__btn-wrapper">
                                                <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                                <Button 
                                                    onClick={() => {
                                                        onImageRemove(index);
                                                        values.image_url = DEFAULT_IMAGE;
                                                    }}
                                                >
                                                    Remove
                                                </Button>
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
    );
}

export default EditProductForm;