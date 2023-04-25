import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthService } from "../../utility/api";
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

function ForgetPassword() {
  const navigate = useNavigate();
  const [err, setError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AuthService.forgetPassword({ email: values.email })
        .then((response) => {
          navigate("/otpverify", { state: { email: values.email } });
        })
        .catch((res) => {
          setError(res.response.data.message);
          return;
        });
    },
  });
  return (
    <>
      <Container
        sx={{
          minHeight: "100%",
          display: "grid",
          placeItems: "center",
          "& .MuiPaper-root": {
            background: `${colors.primary[400]} !important`,
          },
        }}
      >
        <Paper sx={{ maxWidth: "500px", minWidth:"350px" ,maxHeight: "min-content", p: "2rem" }}>
          <Stack alignItems={"center"}>
            <Typography padding={"3rem 0rem 1rem 0rem"} variant="h3">
              {" "}
              Forget Password
            </Typography>
            <form onSubmit={formik.handleSubmit} sx={{width:"100%"}} >
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Typography variant="subtitle1" color="red">
                {err}
              </Typography>
              <div>
              <div style={{textAlign:'end'}}>
             <Link style={{textDecoration:'none', color:colors.blueAccent[500], fontWeight:'bold'}} to="/login">Login</Link>
            </div>
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{mt:'0.4rem'}}
              >
                Submit
              </Button>
            </form>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default ForgetPassword;
