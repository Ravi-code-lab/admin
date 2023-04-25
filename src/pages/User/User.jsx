import { PersonAddAlt } from '@mui/icons-material';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from 'yup';

function User() {
    const [open, setOpen] = useState(false);
    const [err, setError] = useState("");
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const validation = yup.object({
        name:yup.string().required("Name is requred"),
        postion:yup.string().required("Postion is requried")
    })

    const formik = useFormik({
        initialValues:{
            profile:'',
            name:'',
            postion:''
        },
        onSubmit:(values)=>{

        }
    });
  return (
    <Container sx={{boxShadow:'1px 1px 2px grey', mt:'2rem', p:'1rem'}}>
        <Stack>
            <Typography variant='h3'>Users</Typography>
            <div style={{display:'flex', justifyContent:"flex-end"}}> 
            <Button variant="outlined" onClick={handleClickOpen}><PersonAddAlt/> Add User</Button>
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Add users like other admins
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={formik.values.name}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="position"
            label="Position"
            type="text"
            name="name"
            fullWidth
            value={formik.values.name}
            variant="position"
          />
          <TextField
            autoFocus
            margin="dense"
            id="main_img"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={formik.values.name}
            variant="outlined"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type='submit'>Add User</Button>
        </DialogActions>
        </form>
      </Dialog>
            </div>
        </Stack>
    </Container>
  )
}

export default User