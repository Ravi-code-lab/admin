import Header from '../../../components/Header'
import { Button, Divider, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import * as yup from 'yup';
import { HttpService } from '../../../utility/api';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { onChangeMobileDateValue } from '../../../utility/utility';
import moment from 'moment';
import { Add, Delete } from '@mui/icons-material';
function EditEvent() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams()
    // Global -----------------------------------
    const [event, setEvent] = useState({});
    async function fetchEvent() {
      const res = await HttpService.getEventById(id);
      const data = await res.data;
      console.log(data);
      setEvent(data.event);
      basicForm.setValues({
        name: data.event.name,
        description: data.event.description,
        event_start:data.event.event_date.from,
        event_end:data.event.event_date.to,
        // registration_start:moment(data.event.registration_datetime.from).toDate().toDateString(),
        // registration_end:moment(data.event.registration_datetime.to).toDate().toDateString()
      })
      console.log(moment(data.event.event_date.to))
      toggleForm.setValues({
        draft: data.event.draft,
        carousel: data.event.meta_data && data.event.meta_data.in_carousel
      })
  
      setGallery(data.event.gallery);
  
    }
    
  
  
    // Basic Settins -----------------------------
    const [file, setFile] = useState(null)
  
    const basicForm = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: '',
        description: '',
        event_start:'',
        event_end:'',
        // registration_start:'',
        // registration_end:'',
      },
      onSubmit: async (values) => {
        const res = await HttpService.editEvent(
          {
            id: id,
            name: values.name,
            description: values.description,
            event_from:values.event_start,
            event_to:values.event_end,
            // registration_from: values.event_from,
            // registration_to: values.registration_end,
            // registration_from: values.registration_from,
          }
        )
      }
    })
  
    // Toggle Settings ---------------------------
    const toggleForm = useFormik({
      initialValues: {
        draft: false,
        carousel: false
      },
      onSubmit: async (values) => {
        console.log(values)
        const res = await HttpService.editEvent(
          {
            id: id,
            draft: values.draft,
            meta_data: { in_carousel: values.carousel },
          });
        setEvent(await res.data.event);
      }
    })
  
  
    // Gallary Settings --------------------------
    const [selectedFile, setSeletedFile] = useState([]);
    const [gallery, setGallery] = useState([])
    const [uploading, setUploading] = useState([]);
    const removeImage = async (url) => {
      const res = HttpService.removeImage({
        event_id: id,
        url: url
      })
    }
  
    const addImage = async (e) => {
      const formData = new FormData();
      formData.append("event_id", id);
      formData.append("file", e)
      const res = await HttpService.addImage(formData);
    }

    
  
    // Guest Settings ----------------------------
  
  
    // Other Settings ----------------------------
    // Tags Settings -----------------------------
  
  
    useEffect(() => {
      fetchEvent();
    }, [])  
  return (
    <Box elevation={2} sx={{ p: "2rem 3rem", mt: "2rem" }}>
        <Header title={"Edit Event"} subtitle={"Edit you event and view data about event"}/>
        <Stack  >
        {/* Basic Setting */}
        <Divider sx={{ mb: '2rem' }} />
        <Typography variant='h4' marginBottom={'2rem'}>Basic Settings</Typography>
        <form onSubmit={basicForm.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                color='secondary'
                  fullWidth
                  id='name'
                  name='name'
                  label='Event Name'
                  type='text'
                  value={basicForm.values.name}
                  onChange={basicForm.handleChange}
                  error={basicForm.touched.name && Boolean(basicForm.errors.name)}
                  helperText={basicForm.touched.name && basicForm.errors.name}

                />
              </Grid>
              <Grid item xs={3}>
              <MobileDateTimePicker
                label="Event Start Date and Time"
                name="event_start"
                id="event_start"
                //value={basicForm.values.event_start}
                onChange={(e)=>onChangeMobileDateValue(
                      e,
                      basicForm.handleChange,
                      "event_start"
                    )}
                error={basicForm.touched.event_start && Boolean(basicForm.errors.event_start)}
                helperText={basicForm.touched.event_start && basicForm.errors.event_start}
                slotProps={{ textField: { fullWidth: true ,color:'secondary', value:moment(basicForm.values.event_start)} }}
              />
            </Grid>
            <Grid item xs={3}>
              <MobileDateTimePicker
                fullWidth
                label="Event End Date and Time"
                name="event_end"
                id="event_end"
                // type="date"

                onChange={(e)=>onChangeMobileDateValue(
                    e,
                    basicForm.handleChange,
                    "event_end"
                  )}
                error={basicForm.touched.event_end && Boolean(basicForm.errors.event_end)}
                helperText={basicForm.touched.event_end && basicForm.errors.event_end}
                slotProps={{ textField: { fullWidth: true , color:'secondary',value: moment(basicForm.values.event_end)} }}
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='description'
                  name='description'
                  label='Event desciption'
                  multiline
                  color='secondary'
                  rows={4}
                  value={basicForm.values.description}
                  onChange={basicForm.handleChange}
                  error={basicForm.touched.description && Boolean(basicForm.errors.description)}
                  helperText={basicForm.touched.description && basicForm.errors.description}
                />
              </Grid>
              <Button sx={{ mt: '1rem', ml: '1rem' }} variant='contained' color='secondary' type="submit">
                Update Basic Settings
              </Button>
            </Grid>
          </LocalizationProvider>
        </form>
        <Divider sx={{ mt: '1rem' , mb:'1rem'}} />
        
        {/* Toggle Settings */}
        <Typography variant='h4'>Toggle Settings</Typography>
        <form onSubmit={toggleForm.handleSubmit} style={{ marginTop: '1rem' }}>
          <Typography component={'label'} variant='body2' htmlFor='draft'>Published</Typography>
          <Switch checked={!toggleForm.values.draft} color='secondary' value={!toggleForm.values.draft} onChange={(e) => { e.target.checked = !e.target.checked; e.target.value = !e.target.checked; toggleForm.handleChange(e) }} id='draft' name='draft' />
          <br />
          <Typography component={'label'} variant='body2' htmlFor='carousel'>In Carousel</Typography>
          <Switch checked={toggleForm.values.carousel} color='secondary'value={toggleForm.values.carousel} onChange={toggleForm.handleChange} id='carousel' name='carousel' />
          <br />
          <Button sx={{ mt: '1rem'}} variant='contained' color='secondary' type="submit">
            Update Toggle Settings
          </Button>
        </form>
        <Divider sx={{ mt: '1rem' }} />
        
        {/* Gallary Setting */}
        <Typography variant='h4' marginBottom={'2rem'}>Image Settings</Typography>
        <Stack direction={'row'}>
            {selectedFile.length > 0 && selectedFile.map((url)=>{
                return <img src={url} style={{width:'30rem'}}/>
            })}
        </Stack>
        <input
          style={{ display: "none" }}
          id="image-file"
          name='image_file'
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e)=>{
             addImage(document.getElementById("image-file").files[0]).then((res)=>{
                window.location.reload()
             })
          }}
        />
        <label htmlFor="image-file">
          <Button variant="outlined" color="secondary" component="span" >
            <Add/>        
            Add Images
          </Button>
        </label>
        <Box>
        </Box>
        {/* <Button sx={{ mt: '1rem', ml: '1rem' }} variant='contained' color='secondary' onClick={(e) => { if() addImage(document.getElementById("image-file").files) }}>
          Upload SelectedImage
        </Button> */}

        {gallery.length > 0 ? <ImageList rowHeight={3} sx={{ width: "100%", height: '80vh' }}>
          {gallery.map((url) => {
            return (<ImageListItem key={url}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${url}?w=248&h=400&fit=scale`}
                srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
                alt={""} />
              <ImageListItemBar
                color='red'
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`Deleste Image`}
                    onClick={(e) => {
                      removeImage(url).then(()=>{
                        window.location.reload()
                      })
                    }}
                  >
                    <Delete />
                  </IconButton>
                }
              />
            </ImageListItem>)
          })}
        </ImageList> : <Typography variant='body1'> No image added upload some</Typography>
        }

        </Stack>
    </Box>
  )
}

export default EditEvent