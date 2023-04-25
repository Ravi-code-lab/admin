import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthService } from '../../utility/api';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import LinkBtn from '../../components/Button/LinkBtn';

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [err,setError] = useState('');
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter valid email")
      .required("Email is required"),
    password: yup
      .string("Enter you password")
      .min(8, 'Password must me 8 character')
      .required('Password is required')
  })


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      AuthService.login({email:values.email, password:values.password})
      .then((response)=>{
        const data = response.data;
        localStorage.setItem('token',data.accessToken);
        window.location.replace("/")
      }).catch((res)=>{
        setError(res.response.data.message)
        return
      })
    }
  })
  return (
    <>
    <Container sx={{
      "& .MuiPaper-root":{
        background:`${colors.primary[400]} !important`
      },
      minHeight:'100%', display:'grid', placeItems:'center'}}>
      <Paper 
        
      sx={{ maxWidth:'500px', maxHeight:'min-content', p:'2rem'
      }}>
        <Stack alignItems={'center'}>
          <Typography
          padding={'3rem 0rem'}
          variant='h3'   
          >Event Admin Page</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id='email'
              name='email'
              label='Email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{mb:'1rem'}}
            />
            <TextField
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{mb:'1rem'}}
            />
            <Typography variant='subtitle1' color='red'>{err}</Typography>
            <div style={{textAlign:'end'}}>
             <Link style={{textDecoration:'none', color:colors.blueAccent[500]}} to="/forget">Forget Password?</Link>
            </div>
            <Button variant="contained" sx={{mt:'2rem'}} fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Stack>
      </Paper>
      </Container>
    </>
  )
}

export default Login