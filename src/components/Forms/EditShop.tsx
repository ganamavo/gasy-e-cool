import React from 'react';
import { Box, Stack, TextField, Button } from '@mui/material';
import { Form, FormikProvider } from "formik";
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";

interface EditShopProps {
    formik: any;
    image: ImageType[];
    handleImageUpload: (imageList: ImageListType) => void;
}

const EditShopForm: React.FC<EditShopProps> = ({ formik, image, handleImageUpload }) => {

    const { errors, touched, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate>
                <Stack gap={3}>
                    <Box>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            type="text"
                            label="Shop Name"
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
                                                <Button color='error' onClick={() => {
                                                    onImageRemove(index);
                                                    // TODO: Should remove image when editing
                                                }}>Remove</Button>
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
                                label="Location"
                                size="small"
                                {...getFieldProps("location")}
                                error={Boolean(touched.location && errors.location)}
                                helperText={touched.location && errors.location}
                            />
                            <TextField
                                fullWidth
                                autoComplete="off"
                                type="text"
                                label="Contact"
                                size="small"
                                {...getFieldProps("contact")}
                                error={Boolean(touched.contact && errors.contact)}
                                helperText={touched.contact && errors.contact}
                            />
                        </Box>
                        <Box display='flex' flexDirection='row' gap={2}>
                            <TextField
                                fullWidth
                                autoComplete="off"
                                type="text"
                                label="Facebook Link"
                                size="small"
                                {...getFieldProps("facebook_link")}
                                error={Boolean(touched.facebook_link && errors.facebook_link)}
                                helperText={touched.facebook_link && errors.facebook_link}
                            />
                            <TextField
                                fullWidth
                                autoComplete="off"
                                type="text"
                                label="Twitter Link"
                                size="small"
                                {...getFieldProps("twitter_link")}
                                error={Boolean(touched.twitter_link && errors.twitter_link)}
                                helperText={touched.twitter_link && errors.twitter_link}
                            />
                        </Box>
                        <Stack>
                            <TextField
                                fullWidth
                                autoComplete="off"
                                type="text"
                                label="Category"
                                size="small"
                                {...getFieldProps("category")}
                                error={Boolean(touched.category && errors.category)}
                                helperText={touched.category && errors.category}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
}

export default EditShopForm;