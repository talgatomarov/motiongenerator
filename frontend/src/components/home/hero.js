import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import aiIcon from "./images/ai.svg";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
    fontWeight: 400,
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item lg={8} md={8} xs={12}>
        <Typography variant="h3" className={classes.title}>
          Generate debating motion
        </Typography>

        <Typography variant="subtitle1">
          using state-of-the-art natural languange model.
        </Typography>
      </Grid>

      <Grid item lg={4} md={4} xs={12} align="center">
        <img src={aiIcon} alt="AI Icon" width="192" height="192" />
      </Grid>
    </Grid>
  );
};

export default Hero;
