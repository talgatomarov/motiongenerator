import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    paddingBottom: theme.spacing(4)
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
      <Grid container className={classes.navbar}>
        <Grid item lg={4} md={4} xs={12}>
          <Typography variant="h6">motiongenerator</Typography>
        </Grid>
      </Grid>
  );
};

export default Navbar;
