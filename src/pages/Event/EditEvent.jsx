import { Box, Button, Divider, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Stack, Switch, TextField, ToggleButton, Typography } from '@mui/material'
import { Container } from '@mui/system';
import { DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HttpService } from '../../utility/api';
import moment from 'moment';
import { Delete } from '@mui/icons-material';

function EditEvent() {
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
      // event_start: moment(data.event.event_date.from).toDate().toDateString(),
      // event_end:moment(data.event.event_date.to).toDate().toDateString(),
      // registration_start:moment(data.event.registration_datetime.from).toDate().toDateString(),
      // registration_end:moment(data.event.registration_datetime.to).toDate().toDateString()
    })
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
      // event_start:'',
      // event_end:'',
      // registration_start:'',
      // registration_end:'',
    },
    onSubmit: async (values) => {
      const res = await HttpService.editEvent(
        {
          id: id,
          name: values.name,
          description: values.description
          // event_from:values.event_start,
          // event_to:values.event_end,
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
    <Container sx={{ boxShadow: '1px 1px 5px grey', mt: '2rem' }}>
      <Stack  >
        <Typography variant='h3'>Edit Event</Typography>
        {/* Basic Setting */}
        <Divider sx={{ mb: '2rem' }} />
        <Typography variant='h6' marginBottom={'2rem'}>Basic Settings</Typography>
        <form onSubmit={basicForm.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
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
              {/* <Grid item xs={3}>
              <DesktopDateTimePicker
                label="Event Start Date and Time"
                name="event_start"
                id="event_start"
                type="date"
                value={basicForm.values.event_start}
                onChange={basicForm.handleChange}
                error={basicForm.touched.event_start && Boolean(basicForm.errors.event_start)}
                helperText={basicForm.touched.event_start && basicForm.errors.event_start}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={3}>
              <DesktopDateTimePicker
                fullWidth
                label="Event End Date and Time"
                name="event_end"
                value={basicForm.values.event_end}
                id="event_end"
                type="date"
                onChange={basicForm.handleChange}
                error={basicForm.touched.event_end && Boolean(basicForm.errors.event_end)}
                helperText={basicForm.touched.event_end && basicForm.errors.event_end}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth

                  id='description'
                  name='description'
                  label='Event desciption'
                  multiline
                  rows={4}
                  value={basicForm.values.description}
                  onChange={basicForm.handleChange}
                  error={basicForm.touched.description && Boolean(basicForm.errors.description)}
                  helperText={basicForm.touched.description && basicForm.errors.description}
                />
              </Grid>
              {/* s */}
              <Button sx={{ mt: '1rem', ml: '1rem' }} variant='outlined' type="submit">
                Update Basic Settings
              </Button>
            </Grid>
          </LocalizationProvider>
        </form>
        <Divider sx={{ mt: '1rem' }} />


        {/* Toggle Settings */}
        <Typography variant='h6' marginBottom={'2rem'}>Toggle Settings</Typography>
        <form onSubmit={toggleForm.handleSubmit} style={{ marginTop: '1rem' }}>
          <Typography component={'label'} variant='body2' htmlFor='draft'>Published</Typography>
          <Switch checked={!toggleForm.values.draft} value={!toggleForm.values.draft} onChange={(e) => { e.target.checked = !e.target.checked; e.target.value = !e.target.checked; toggleForm.handleChange(e) }} id='draft' name='draft' />
          <br />
          <Typography component={'label'} variant='body2' htmlFor='carousel'>In Carousel</Typography>
          <Switch checked={toggleForm.values.carousel} onChange={toggleForm.handleChange} id='carousel' name='carousel' />
          <br />
          <Button sx={{ mt: '1rem', ml: '1rem' }} variant='outlined' type="submit">
            Update Toggle Settings
          </Button>
        </form>
        <Divider sx={{ mt: '1rem' }} />



        {/* Gallary Setting */}
        <Typography variant='h6' marginBottom={'2rem'}>Image Settings</Typography>

        <input
          style={{ display: "none" }}
          id="image-file"
          name='image_file'
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />
        <label htmlFor="image-file">
          <Button variant="contained" color="primary" component="span">
            Add Images
          </Button>
        </label>
        <Box>
        </Box>
        <Button sx={{ mt: '1rem', ml: '1rem' }} variant='outlined' onClick={(e) => { addImage(document.getElementById("image-file").files[0]) }}>
          Upload Image
        </Button>

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
                      removeImage(url)
                    }}
                  >
                    <Delete />
                  </IconButton>
                }
              />
            </ImageListItem>)
          })}
        </ImageList> : <Typography variant='body2'> No image added upload some</Typography>
        }



        {/* Guest Setting */}
        {/* <Divider sx={{ mt: '1rem' }} />
        <Typography variant='h6' marginBottom={'2rem'}>Guest Settings</Typography> */}

        {/* Tags Settings*/}
      </Stack>
    </Container>
  )
}

export default EditEvent