import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthService } from '../../utility/api';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

function VerifyOTP() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const {state} = useLocation();
  const [err,setError] = useState('');

  const validationSchema = yup.object({
    otp: yup
      .string("Enter your email")
      .max(6, "OTP is 6 digit")
      .min(6, "OTP is 6 digit")
      .required("Email is required")
  })


  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      AuthService.verifyOtp({email:state.email, otp:values.otp})
      .then((response)=>{
        navigate('/changePassword', {state:{email:state.email}});
      }).catch((res)=>{
        setError(res.response.data.message);
        return
      })
    }
  })
  return (
    <>
    <Container sx={{minHeight:'100%', display:'grid', placeItems:'center', 
    "& .MuiPaper-root": {
            background: `${colors.primary[400]} !important`,
          }}}>
      <Paper sx={{ maxWidth:'500px', maxHeight:'min-content', p:'2rem'}}>
        <Stack alignItems={'center'}>
          <Typography
          padding={'3rem 0rem'}
          variant='h3'   
          > Verify OTP</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id='otp'
              name='otp'
              
              label='otp'
              type='number'
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
              sx={{mb:'1rem'}}
            />
            <Typography variant='subtitle1' color='red'>{err}</Typography>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Stack>
      </Paper>
      </Container>
    </>
  )
}

export default VerifyOTP