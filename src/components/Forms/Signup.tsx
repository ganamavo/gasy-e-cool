import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { signUp } from "../../actions/userRegistration";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(45, "Too Long!")
      .required("First name required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(45, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string().required("Please confirm your password"),
  });

  const userInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const formik = useFormik({
    initialValues: userInitialValues,
    validationSchema: SignupSchema,
    onSubmit: () => {
      // @ts-ignore
      dispatch(signUp(values, (err: string) => setError(err)));
      navigate('/');
      setValues(userInitialValues);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, values, setValues } = formik;
 
  return (
    <FormikProvider value={formik}>
      <Form 
        autoComplete="off" 
        noValidate 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit()
        }}
      >
        <Stack spacing={3}>
          <Stack
            display='flex'
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("first_name")}
              error={Boolean(touched.first_name && errors.first_name)}
              helperText={touched.first_name && errors.first_name}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("last_name")}
              error={Boolean(touched.last_name && errors.last_name)}
              helperText={touched.last_name && errors.last_name}
            />
          </Stack>

          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              {...getFieldProps("confirm_password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.confirm_password && errors.confirm_password) ||  !!(values.confirm_password && values.password !== values.confirm_password)}
              helperText={touched.confirm_password ? errors.confirm_password : !!(values.confirm_password && values.password !== values.confirm_password) ? "Passwords don't match" : ''}
            />
          </Stack>

          <Box>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={!values.first_name || !values.last_name || !values.email || !values.password || !values.confirm_password || !!error}
            >
              Sign up
            </LoadingButton>
          </Box>
          {
            error && (
              <Alert severity="error" >
                {error}, Please try again!
              </Alert>
            )
          }
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;