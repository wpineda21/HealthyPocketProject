import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_Alerta } from "../functions";
import Header from "../Header/Header";
import HeaderNuevo from "../Header/HeaderNuevo";
import Button from "react-bootstrap/Button";
import "./citaPage.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Padding } from "@mui/icons-material";

const drawerWidth = 240;
function createData(id, name, calories, fat, carbs, protein) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24),
  createData(2, "Ice cream sandwich", 237, 9.0, 37),
  createData(5, "Gingerbread", 356, 16.0, 49),
];

const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
  },
];

const NewCitasPage = (props) => {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value2, setValue2] = React.useState(dayjs("2022-04-17"));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleModify = (id) => {
    // Lógica para modificar la cita con el ID proporcionado
    console.log("Modificar cita con ID:", id);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar la cita con el ID proporcionado
    console.log("Eliminar cita con ID:", id);
  };
  return (
    <>
      <HeaderNuevo></HeaderNuevo>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DemoItem>
              <DateCalendar
                value={value2}
                onChange={(newValue) => setValue2(newValue)}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>

        <Card sx={{ width: "100%", maxWidth: 800, marginLeft: "20px" }}>
          <CardActionArea>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Citas Medicas
                </Typography>
                <div>
                  <Button
                    size="small"
                    color="primary"
                    style={{ margin: "3px" }}
                    onClick={handleClickOpen}
                  >
                    Agregar Cita
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    style={{ margin: "3px" }}
                  >
                    Recargar Citas
                  </Button>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">Descripcion</TableCell>
                      <TableCell align="center">Fecha </TableCell>
                      <TableCell align="center">Tiempo en Hospital</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                      <TableCell align="center">Opciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={handleClickOpen2}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(row.id)}
                            style={{ marginLeft: "5px" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Stack spacing={2}>
              <Pagination count={10} color="primary" />
            </Stack>
          </CardActions>
        </Card>
        <React.Fragment>
          <Dialog open={open} onClose={handleClose} sx={{ minWidth: "500px" }}>
            <DialogTitle>Agregar Cita</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Agregar Descripcion de la Cita:
              </DialogContentText>
              <TextField
                autoFocus
                id="outlined-basic"
                margin="normal"
                placeholder="Descripcion"
                type="text"
                fullWidth
                variant="outlined"
              />
              {/* Agregamos un espacio vertical entre los elementos */}
              <Box mt={2} />
              <DialogContentText>
                Agrega Los Dias que Pasaste En El Hospital o Clinica:
              </DialogContentText>
              <TextField
                autoFocus
                id="outlined-basic"
                margin="normal"
                placeholder="Tiempo en Hospital"
                type="text"
                fullWidth
                variant="outlined"
              />
              <DialogContentText>
                Agrega el Precio de La Cita:
              </DialogContentText>
              <TextField
                autoFocus
                id="outlined-basic"
                margin="normal"
                placeholder="$0.00"
                type="text"
                fullWidth
                variant="outlined"
              />
              <DialogContentText>
                Fecha que se realizo la Cita:
              </DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} >
                  <DatePicker fullWidth  />
                </DemoContainer>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Cancelar
              </Button>
              <Button onClick={handleClose}>Guardar</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <React.Fragment>
          <Dialog open={open2} onClose={handleClose} sx={{ minWidth: "500px" }}>
            <DialogTitle>Editar Cita</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Agrega Una Descripcion de la Cita:
              </DialogContentText>
              <TextField
                autoFocus
                id="outlined-basic"
                margin="normal"
                placeholder="Descripcion"
                type="text"
                fullWidth
                variant="outlined"
              />
              {/* Agregamos un espacio vertical entre los elementos */}
              <Box mt={2} />
              <DialogContentText>
                Agrega Los Dias que Pasaste En El Hospital o Clinica:
              </DialogContentText>
              <TextField
                autoFocus
                id="outlined-basic"
                margin="normal"
                placeholder="Tiempo en Hospital"
                type="text"
                fullWidth
                variant="outlined"
              />
              <DialogContentText>
                Agrega el Precio de La Cita:
              </DialogContentText>
              <TextField
                autoFocus
                id="outlined-basic"
                margin="normal"
                placeholder="$0.00"
                type="text"
                fullWidth
                variant="outlined"
              />
              <DialogContentText>
                Fecha que se realizo la Cita:
              </DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} >
                  <DatePicker fullWidth  />
                </DemoContainer>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Cancelar
              </Button>
              <Button onClick={handleClose}>Guardar</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </>
  );
};

export default NewCitasPage;
