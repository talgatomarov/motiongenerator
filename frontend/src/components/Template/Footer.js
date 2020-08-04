import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing(8),
    width: "100%",
  },
  contact: {
    fontSize: "12px",
    padding: theme.spacing(1),
  },
  attribution: {
    fontSize: "10px",
    color: "#aaaaaa",
    textDecoration: "none",
  },
  attributionLink: {
    textDecoration: "none",
    color: "#aaaaaa",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Divider />
      <Typography variant="body2" className={classes.contact} align="center">
        Talgat Omarov.{" "}
        <a href="mailto:talgat.omarov@nu.edu.kz">talgat.omarov@nu.edu.kz</a>
      </Typography>

      <Typography
        variant="body2"
        className={classes.attribution}
        align="center"
      >
        Icons made by
        <a
          href="http://www.freepik.com/"
          title="Freepik"
          className={classes.attributionLink}
        >
          {" "}
          Freepik{" "}
        </a>{" "}
        from
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          className={classes.attributionLink}
        >
          {" "}
          www.flaticon.com{" "}
        </a>
      </Typography>
    </div>
  );
};

export default Footer;
