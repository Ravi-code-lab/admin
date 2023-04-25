import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Form, useFormik, validateYupSchema } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import {
  DateTimePicker,
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Add,
  DoDisturb,
  Stop,
  StopCircle,
  UploadFile,
} from "@mui/icons-material";
import { HttpService } from "../../utility/api";
import { useNavigate } from "react-router-dom";
import {
  MobileDateToUTC,
  onChangeMobileDateValue,
} from "../../utility/utility";
import Header from "../../components/Header";
import { useRef } from "react";

function AddEvent() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURl] = useState(null);
  const [err, setError] = useState();

  const validation = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    event_start: yup.date().required("Event Start date time is required"),
    event_end: yup.date().required("Event end date is required"),
    registration_end: yup.date(),
    registration_start: yup.date(),
    main_img: yup.mixed().required("Main Image is required"),
  });
  const fileInput = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      registration_start: "",
      registration_end: "",
      event_start: "",
      event_end: "",
    },

    validateSchema: validation,
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values);
      if (file == null) {
        setError("File is required");
        return;
      }

      formData.append("name", values.name);
      formData.append("main_img", file);
      formData.append("description", values.description);
      formData.append("event_from", values.event_start);
      formData.append("event_to", values.event_end);
      formData.append(
        "registration_from",
        values.registration_start ? values.registration_start : ""
      );
      formData.append(
        "registration_to",
        values.registration_end ? values.registration_end : ""
      );

      HttpService.addEvent(formData)
        .then((res) => {
          navigate("/events");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <>
      <Box elevation={2} sx={{ p: "2rem 3rem", mt: "2rem" }}>
        <Header
          title="Add Event"
          subtitle={
            "You can add event these evet will get save as Draft after adding you can search them in event page and edit them and manage their gallary."
          }
        />

        <form onSubmit={formik.handleSubmit} style={{ marginTop: "2rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Event Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={3}>
                <MobileDateTimePicker
                  label="Event Start Date and Time"
                  name="event_start"
                  id="event_start"
                  type="date"
                  onChange={(e) => {
                    onChangeMobileDateValue(
                      e,
                      formik.handleChange,
                      "event_start"
                    );
                  }}
                  error={
                    formik.touched.event_start &&
                    Boolean(formik.errors.event_start)
                  }
                  helperText={
                    formik.touched.event_start && formik.errors.event_start
                  }
                  slotProps={{
                    textField: { fullWidth: true, color: "secondary" },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <MobileDateTimePicker
                  fullWidth
                  label="Event End Date and Time"
                  name="event_end"
                  id="event_end"
                  type="date"
                  onChange={(e) => {
                    onChangeMobileDateValue(
                      e,
                      formik.handleChange,
                      "event_end"
                    );
                  }}
                  error={
                    formik.touched.event_end && Boolean(formik.errors.event_end)
                  }
                  helperText={
                    formik.touched.event_end && formik.errors.event_end
                  }
                  slotProps={{
                    textField: { fullWidth: true, color: "secondary" },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Event desciption"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={4}>
                <MobileDateTimePicker
                  label="Registration Start Date (Optional)"
                  name="registration_start"
                  id="registration_start"
                  type="date"
                  onChange={(e) => {
                    onChangeMobileDateValue(
                      e,
                      formik.handleChange,
                      "registration_start"
                    );
                  }}
                  error={
                    formik.touched.registration_start &&
                    Boolean(formik.errors.registration_start)
                  }
                  helperText={
                    formik.touched.registration_start &&
                    formik.errors.registration_start
                  }
                  slotProps={{
                    textField: { fullWidth: true, color: "secondary" },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <MobileDateTimePicker
                  fullWidth
                  label="Registration End Date (Optional)"
                  name="registration_end"
                  id="registration_end"
                  type="date"
                  onChange={(e) => {
                    onChangeMobileDateValue(
                      e,
                      formik.handleChange,
                      "registration_end"
                    );
                  }}
                  error={
                    formik.touched.registration_end &&
                    Boolean(formik.errors.registration_end)
                  }
                  helperText={
                    formik.touched.registration_end &&
                    formik.errors.registration_end
                  }
                  slotProps={{
                    textField: { fullWidth: true, color: "secondary" },
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                {/* <Button variant='outlined' color='secondary' LinkComponent='label'  htmlFor="main_img" startIcon={<UploadFile />} sx={{ marginRight: '1rem' }}>
                  Select Main Event Image
                  <input type="file" placeholder='Display Image Upload' multiple name="main_img"  id="main_img" accept="image/png, image/gif, image/jpeg" onChange={(e)=> setFile(e.target.files[0])}/>
                    </Button> */}
                {fileURL && <img src={fileURL} style={{width:'30rem'}}/>}
                <Button
                  variant="outlined"
                  color="secondary"
                  LinkComponent="label"
                  htmlFor="main_img"
                  startIcon={<UploadFile />}
                  sx={{ marginRight: "1rem" }}
                  onClick={() => fileInput.current.click()}
                >
                  Select Main Event Image
                </Button>
                <input
                  ref={fileInput}
                  type="file"
                  multiple
                  name="main_img"
                  id="main_img"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileURl(URL.createObjectURL(e.target.files[0]));
                  }}
                  style={{ display: "none" }}
                />
              </Grid>
            </Grid>
            <Typography variant="body2" color="red">
              {err}
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                gap: "2rem",
              }}
            >
              <Button color='secondary' variant="contained" type="submit">
                <Add />
                Add Event
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  navigate("/events");
                }}
              >
                <DoDisturb />
                Cancle
              </Button>
            </Box>
          </LocalizationProvider>
        </form>
      </Box>
    </>
  );
}

export default AddEvent;
