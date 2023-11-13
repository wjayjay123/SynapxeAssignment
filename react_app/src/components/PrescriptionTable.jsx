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

export default function PrescriptionTable(props) {
  const classes = useStyles();
  const prescriptionData = props.prescriptionData;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="center">
              Prescription <br /> Name
            </TableCell>
            <TableCell align="center">
              Current <br /> Amount
            </TableCell>
            <TableCell align="center">
              Prescribed <br /> Amount
            </TableCell>
            <TableCell align="center">
              Prescription <br /> Remaining
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptionData.map((prescription, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="center">
                {prescription.prescription_name}
              </TableCell>
              <TableCell align="center">
                {prescription.prescription_current_amount}
              </TableCell>
              <TableCell align="center">
                {prescription.prescription_amount}
              </TableCell>
              <TableCell align="center">
                {(parseFloat(prescription.prescription_current_amount, 10) /
                  parseFloat(prescription.prescription_amount, 10)) *
                  100 <
                25 ? (
                  <Button
                    variant="disabled"
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Low
                  </Button>
                ) : (
                  <Button
                    variant="disabled"
                    style={{
                      color: "white",
                      backgroundColor: "green",
                      fontWeight: "bold",
                    }}
                  >
                    High
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
