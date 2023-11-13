import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export default function AppointmentTable(props) {
  const classes = useStyles();
  const appointmentData = props.appointmentData;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="center">
              Appointment <br /> Date
            </TableCell>
            <TableCell align="center">
              Appointment <br /> Time
            </TableCell>
            <TableCell align="center">
              Doctor <br /> Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentData.map((appointment, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="center">
                {appointment.appointment_date}
              </TableCell>
              <TableCell align="center">
                {appointment.appointment_time}
              </TableCell>
              <TableCell align="center">{appointment.doctor_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
