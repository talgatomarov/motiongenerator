import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MotionForm from './MotionForm'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  item: {
    padding: theme.spacing(2),
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

const Home = () => {
  const classes = useStyles();


  return (
      <Container>
        <Paper className={classes.paper} elevation={1} >
          <Grid
            container
            direction={"column"}
          >

            <Grid item className={classes.item} xs={12}>
            <Typography variant="h2">
              Motion Generator
            </Typography >
            </Grid>

            <Grid item className={classes.item} xs={12}>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum ipsum ut leo condimentum pulvinar. Aenean feugiat sapien eu justo auctor elementum. Praesent sagittis elit at ex facilisis rutrum. Praesent laoreet tempus sem, sed laoreet nunc tempor at. Quisque at aliquet odio, non gravida ante. Ut vitae bibendum lectus, lacinia mollis lorem. Etiam auctor at sem cursus venenatis. Integer auctor mi metus, eu scelerisque lorem tincidunt ac. Vivamus eu augue ipsum. Fusce euismod orci sed libero sodales, rutrum aliquet purus sodales.

            </Typography>
            </Grid>


            <Grid item className={classes.item} xs={12}>
            <Typography variant="body1">
              Try it yourself
            </Typography>
            </Grid>

            <Grid item className={classes.item} xs={12}>
              <MotionForm/>
            </Grid>
          </Grid>
        </Paper>
      </Container>
  );
};

export default Home
