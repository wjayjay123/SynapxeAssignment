import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PatientCard(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const patientData = props.patientData;
  const userData = props.userData;

  const handleDetails = () => {
    navigate(`/Details/${patientData.patient_id}`, {
      state: { patientData, userData },
    });
  };

  return (
    <Card className={classes.root} style={{ margin: "0.5rem", width: "500px" }}>
      <CardActionArea>
        <CardMedia className={classes.media}>
          <AccountCircleIcon style={{ fontSize: "150px" }} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {patientData.patient_name}
          </Typography>
          <Typography>
            Prescription Amount: <br />
            {patientData.prescriptions_status === 1 ? (
              <Button
                variant="disabled"
                style={{ color: "white", backgroundColor: "green" }}
              >
                High
              </Button>
            ) : (
              <Button
                variant="disabled"
                style={{ color: "white", backgroundColor: "red" }}
              >
                Low
              </Button>
            )}
          </Typography>
          <Typography>
            Appointment Status: <br />
            {patientData.appointment_status === 1 ? (
              <Button
                variant="disabled"
                style={{ color: "white", backgroundColor: "green" }}
              >
                Booked
              </Button>
            ) : (
              <Button
                variant="disabled"
                style={{ color: "white", backgroundColor: "red" }}
              >
                Not Booked
              </Button>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button size="small" color="primary" onClick={handleDetails}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
