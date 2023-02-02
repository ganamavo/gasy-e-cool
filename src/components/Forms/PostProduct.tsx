import React, { useState } from "react"; 
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab"; 
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/userRegistration";
import { User, UserState } from "../../types/User";
import { addProduct } from "../../actions/product";

const AddProductForm = () => { 
  const user = useSelector((state: { user: UserState}) => state.user?.data);
  const users = useSelector((state: { users: { data: User }}) => state.users?.data);
  const dispatch = useDispatch();
  
  const [error, setError] = useState(null);

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    owner_first_name: Yup.string().required("First Name is required"),
    owner_last_name: Yup.string(),
    owner_email: Yup.string().required('Email is required'),
    owner_phone_number: Yup.string().required('Your phone number is required')
  });

  const formik = useFormik({
    initialValues: {
      name: "Nice Prod",
      description: "It's free for test",
      owner_first_name: user?.first_name || '',
      owner_last_name: user?.last_name || '',
      owner_phone_number: '+261 34 05 133 41',
      image_url: 'https://pixabay.com/photos/figure-skating-runner-figure-skater-3198861/',
      owner_email: user?.email || '',
      image_alt_text: '',
      video_url: '',
      price: '5000ar'
    },
    validationSchema: ProductSchema,
    onSubmit: async() => {
      // @ts-ignore
      dispatch(addProduct(values, error => setError(error)));
    },
  }); 

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

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
          <Button variant="contained" component="label">
            Upload an image
            <input hidden accept="image/*" multiple type="file" />
          </Button>
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