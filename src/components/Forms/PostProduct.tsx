import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab"; 
import ImageUploading, { ImageListType } from "react-images-uploading";
import { UserState } from "../../types/User";
import { addProduct } from "../../actions/product";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  owner_first_name: Yup.string().required("First Name is required"),
  owner_last_name: Yup.string(),
  owner_email: Yup.string().required('Email is required'),
  owner_phone_number: Yup.string().required('Your phone number is required'),
  price: Yup.string().required('You need to specify the price or it will be free')
});

const AddProductForm = () => { 
  const user = useSelector((state: { user: UserState}) => state.user?.data);
  const [image, setImage] = useState<ImageListType>([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const productInitialValues = {
    name: "",
    description: "",
    owner_first_name: user?.first_name || '',
    owner_last_name: user?.last_name || '',
    owner_phone_number: '',
    image_url: '',
    owner_email: user?.email || '',
    image_alt_text: '',
    video_url: '',
    price: 'Free'
  };

  const formik = useFormik({
    initialValues: productInitialValues,
    validationSchema: ProductSchema,
    onSubmit: async() => {
      values.image_url = image[0]?.dataURL || 'https://img.freepik.com/free-vector/business-people-handshake-doodle-vector_53876-126569.jpg?w=2000'
      // @ts-ignore
      dispatch(addProduct(values, error => setError(error)));
      setValues(productInitialValues);
      setImage([]);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setValues } = formik;

  const handleImageUpload = (
    imageList: ImageListType
  ) => {
    setImage(imageList);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
      </Form>
    </FormikProvider>
  );
};

export default AddProductForm;