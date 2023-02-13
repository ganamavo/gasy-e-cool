import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab"; 
import ImageUploading, { ImageListType } from "react-images-uploading";
import { UserState } from "../../types/User";
import { addShop } from "../../actions/shop";

export const ShopSchema = Yup.object().shape({
  name: Yup.string().required("Shop name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  contact: Yup.string().required('Please enter a phone number or email address'),
  facebook_link: Yup.string(),
  twitter_link: Yup.string(),
  category: Yup.string().required('You need to specify your shop category')
});

const AddShopForm = () => { 
  const user = useSelector((state: { user: UserState}) => state.user?.data);
  const [image, setImage] = useState<ImageListType>([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const shopInitialValues = {
    name: "My shop",
    description: "The best shop ever",
    location: 'Madagascar',
    contact: 'Rinon 0340513341',
    twitter_link: 'http://twitter.com',
    image_url: '',
    facebook_link: 'https://fb.com',
    category: 'Eletric'
  };

  const formik = useFormik({
    initialValues: shopInitialValues,
    validationSchema: ShopSchema,
    onSubmit: (values, { resetForm }) => {
      values.image_url = image[0]?.dataURL || 'https://img.freepik.com/free-vector/business-people-handshake-doodle-vector_53876-126569.jpg?w=2000'
      // @ts-ignore
      dispatch(addShop(values, error => setError(error)));
      setImage([]);
      resetForm({ values: undefined });
    },
  });

  const handleImageUpload = (imageList: ImageListType) => {
    setImage(imageList);
  };

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Add your product"}
            </LoadingButton>
        </Stack>
        {!isSubmitting && error && <Alert sx={{ marginTop: 1 }} severity="error">{error}</Alert>}
      </Form>
    </FormikProvider>
  );
};

export default AddShopForm;