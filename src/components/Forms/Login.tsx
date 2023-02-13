import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch  } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";

import { logIn, logOut } from "../../actions/userRegistration";
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['loggedInUser']);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      setCookie('loggedInUser', { email: values.email, isLoggedIn: true }, { path: '/' });
      // @ts-ignore
      dispatch(logIn(values));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Stack>
      {!cookies.loggedInUser ? (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email Address"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Icon icon="eva:eye-fill" />
                          ) : (
                            <Icon icon="eva:eye-off-fill" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
    
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...getFieldProps("remember")}
                        checked={values.remember}
                      />
                    }
                    label="Remember me"
                  />
    
                  <Link
                    component={RouterLink}
                    variant="subtitle2"
                    to="#"
                    underline="hover"
                  >
                    Forgot password?
                  </Link>
                </Stack>
    
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {isSubmitting ? "loading..." : "Login"}
                </LoadingButton>
              </Box>
            </Box>
          </Form>
        </FormikProvider>
      ) : (
        <Stack>
          <Typography marginBottom={1} color='text.secondary'>You are currently logged in with the email address {cookies.loggedInUser.email}</Typography>
          <Typography marginBottom={1} color='text.secondary'>It's very nice to see you becoming a member of <strong>E-Gasy-Cool</strong>!</Typography>
          <Typography marginBottom={1} color='text.secondary'>If you'd like to log in with a different account or log out, you can but we're sad to see you leave. Feel free to contact us if you have any feedback</Typography>
          <Box display='flex' marginTop={3} gap={2} justifyContent='center' alignItems='center'>
            <Button 
              sx={{ alignSelf: 'center'}} 
              variant="contained"
              onClick={() => removeCookie('loggedInUser', { path: '/' })}
            >
              Log in with different account
            </Button>
            <Typography>or</Typography>
            <Button 
              sx={{ alignSelf: 'center', width: 100}}
              variant="contained"
              onClick={() => {
                // @ts-ignore
                dispatch(logOut({email: cookies.loggedInUser.email}));
                removeCookie('loggedInUser', { path: '/' });
              }}
            >
              Log out
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default LoginForm;