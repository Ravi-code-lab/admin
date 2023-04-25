import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkBtn from "../../components/Button/LinkBtn";
import { HttpService } from "../../utility/api";
import Header from "../../components/Header";
import { ColorModeContext, tokens } from "../../theme";

function Event() {
  const [events, setEvents] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 210,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },
    {
      field: "status",
      headerName: "Published",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.value ? (
              <Chip label={"Published"} color={"success"} />
            ) : (
              <Chip color="error" label="Draft" />
            )}
          </>
        );
      },
    },
    {
      field: "carousel",
      headerName: "Carousel",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.value ? (
              <Chip label={"Carousel"} color={"success"} />
            ) : (
              <Chip color="error" label="No Carousel" />
            )}
          </>
        );
      },
    },
    {
      field: "create_date",
      headerName: "Created Date",
      width: 160,
    },
    {
      field: "event_start",
      headerName: "Start Date",
      width: 160,
    },
    {
      field: "event_end",
      headerName: "End Date",
      width: 160,
    },

    {
      field: "edit",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => navigate(`/edit/event/${params.value}`)}>
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                if (
                 window.confirm(
                  "Are you sure you want to delete this event (This is irreversivble)"
                ) == true
                ) {
                  HttpService.removeEvent(params.value);
                  window.location.reload();
                }else{

                }
              }}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  const getEvents = async () => {
    const res = await HttpService.getAllEvents();
    const newRow = [];
    const resData = await res.data;
    resData.events.map((event) => {
      let toLocalDT = (e) => new Date(e).toLocaleString();
      console.log(event);
      newRow.push({
        id: event._id,
        edit: event._id,
        name: event.name,
        event_start: toLocalDT(event.event_date.from),
        event_end: toLocalDT(event.event_date.to),
        carousel: event.meta_data && event.meta_data.in_carousel ? true : false,
        status: !event.draft,
        create_date: toLocalDT(event.created_date),
      });
    });
    setRows(newRow);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Events"
        subtitle="List all event you can edit as see them"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default Event;
