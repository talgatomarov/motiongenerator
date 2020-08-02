import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing(8),
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.header}>
      <Grid item lg={4} md={4} xs={12}>
        <Typography variant="h6">motiongenerator</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
