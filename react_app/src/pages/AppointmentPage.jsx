import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { TextField, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const AppointmentPage = () => {
  const location = useLocation();
  const classes = useStyles();
  const userData = location.state.userData;
  const [patientData, setPatientData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [appointmentData, setAppointmentData] = useState([]);
  const [selectedAppointment, setselectedAppointment] = useState("");
  const [bookingState, setBookingState] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  const handleFetchPatients = async (e) => {
    const result = await fetch(
      `http://localhost:5000/api/patients?singpassID=${userData.singpass_id}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await result.json();
    setPatientData(jsonResult);
  };

  const handleFetchAppointments = async (e) => {
    const result = await fetch(
      `http://localhost:5000/api/appointments?singpassID=${selectedPatient}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await result.json();
    setAppointmentData(jsonResult);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingState && selectedAppointment) {
      const result = await fetch(`http://localhost:5000/api/appointments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          singpass_id: selectedPatient,
          appointment_date: selectedAppointment,
        }),
      });
      const jsonResult = await result.json();
      console.log(jsonResult);
      setSelectedPatient("");
      setselectedAppointment("");
    }
    if (bookingState && selectedDate && selectedTime) {
      let patient = patientData.find((element) => {
        return element.singpass_id === selectedPatient;
      });
      let name = patient.patient_name;
      let date = selectedDate.toLocaleDateString();
      let time = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const result = await fetch(`http://localhost:5000/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          singpass_id: selectedPatient,
          date: date,
          time: time,
          doctor: selectedDoctor,
        }),
      });
      const jsonResult = await result.json();
      console.log(jsonResult);
      setSelectedPatient("");
      setSelectedDate(new Date());
      setSelectedTime(new Date());
      setSelectedDoctor("");
    }
  };

  const handleChangePatient = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleChangeDoctor = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleChangeAppointment = (event) => {
    setselectedAppointment(event.target.value);
  };

  const handleBookingState = (event) => {
    setBookingState(!bookingState);
  };

  useEffect(() => {
    handleFetchPatients();
  }, []);

  useEffect(() => {
    handleFetchAppointments();
  }, [selectedPatient]);

  return (
    <div className="App">
      <Sidebar userData={userData} />
      <div className="auth-form-container">
        <form className="appointment-form" onSubmit={handleSubmit}>
          <Typography gutterBottom variant="h6" component="h2">
            Manage Appointment
          </Typography>
          <FormControl
            required
            className={classes.formControl}
            style={{ width: "300px" }}
          >
            <InputLabel>Select Patient</InputLabel>
            <Select value={selectedPatient} onChange={handleChangePatient}>
              {patientData.map((patients) => (
                <MenuItem
                  key={patients.patient_id}
                  value={patients.singpass_id}
                >
                  {patients.patient_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {selectedPatient && bookingState ? (
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            ) : null}
            {selectedPatient && bookingState ? (
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedTime}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            ) : null}
          </MuiPickersUtilsProvider>
          {selectedPatient && !bookingState ? (
            <FormControl
              required
              className={classes.formControl}
              style={{ width: "300px" }}
            >
              <InputLabel>Select Appointment </InputLabel>
              <Select
                value={selectedAppointment}
                onChange={handleChangeAppointment}
              >
                {appointmentData.map((appointment) => (
                  <MenuItem
                    key={appointment.appointment_id}
                    value={appointment.appointment_date}
                  >
                    {appointment.appointment_date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
          {selectedPatient && bookingState ? (
            <FormControl
              required
              className={classes.formControl}
              style={{ width: "300px" }}
            >
              <InputLabel>Select Doctor</InputLabel>
              <Select value={selectedDoctor} onChange={handleChangeDoctor}>
                <MenuItem value={"Dr. Gerald Neo"}>{"Dr. Gerald Neo"}</MenuItem>
                <MenuItem value={"Dr. Marcus Ang"}>{"Dr. Marcus Ang"}</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#e11f26",
              color: "white",
              fontWeight: "bold",
              padding: "15px",
              borderRadius: "10px",
              margin: "0.5rem",
            }}
          >
            {bookingState ? "Book" : "Delete"}
          </Button>
          <Button
            onClick={handleBookingState}
            variant="contained"
            style={{
              backgroundColor: "#afaea5",
              color: "white",
              fontWeight: "bold",
              padding: "15px",
              borderRadius: "10px",
              margin: "0.5rem",
            }}
          >
            {bookingState ? "Delete an appointment" : "Book an appointment"}
          </Button>
        </form>
      </div>
    </div>
  );
};
