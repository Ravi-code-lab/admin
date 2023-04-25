import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthService } from '../../utility/api';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

function ChangePassword() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [err,setError] = useState('');
  const { state } = useLocation();

  const validationSchema = yup.object({
    cnfpassword: yup
    .string("Enter you password")
    .min(8, 'Password must me 8 character')
    .required('Password is required'),
    password: yup
      .string("Enter you password")
      .min(8, 'Password must me 8 character')
      .required('Password is required')
  })


  const formik = useFormik({
    initialValues: {
      cnfpassword: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      AuthService.changePassword({email:state.email, password:values.password, confirm_password:values.cnfpassword})
      .then((response)=>{
        navigate('/login');
      }).catch((res)=>{
        setError(res.response.data.message)
        return
      })
    }
  })
  return (
    <>
    <Container sx={{minHeight:'100%', display:'grid', placeItems:'center', "& .MuiPaper-root": {
            background: `${colors.primary[400]} !important`}}}>
      <Paper sx={{ maxWidth:'500px', maxHeight:'min-content', p:'2rem'}}>
        <Stack alignItems={'center'}>
          <Typography
          padding={'3rem 0rem'}
          variant='h3'   
          >Change Password</Typography>
          <form onSubmit={formik.handleSubmit}>
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
            <TextField
              fullWidth
              id='cnfpassword'
              name='cnfpassword'
              label='Confirm Password'
              type='password'
              value={formik.values.cnfpassword}
              onChange={formik.handleChange}
              error={formik.touched.cnfpassword && Boolean(formik.errors.cnfpassword)}
              helperText={formik.touched.cnfpassword && formik.errors.cnfpassword}
              sx={{mb:'2rem'}}
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

export default ChangePassword