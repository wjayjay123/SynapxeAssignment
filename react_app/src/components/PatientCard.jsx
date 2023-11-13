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

  return (
    <Card className={classes.root} style={{ margin: "0.5rem" }}>
      <CardActionArea>
        <CardMedia className={classes.media}>
          <AccountCircleIcon style={{ fontSize: "150px" }} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.patientData.patient_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age: {props.patientData.patient_age} <br />
            Gender:{" "}
            {props.patientData.patient_gender === "M" ? "Male" : "Female"}{" "}
            <br />
            Address: {props.patientData.patient_address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
