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
              This is a debating motion generator model. It is built upon the GPT-2 model fine-tuned on the set of 5183 debating motions.
              For those who are not familiar with debating motions, they usually look like: "This house would ban gun ownership" or "This house believes that charities should not accept money from donors they consider immoral".
            </Typography>

            <Typography variant="body1" gutterBottom>
              You can generate a motion by typing the beginning of the motion in the prompt below.
              The model will finish the motion for you. 
              I suggest to give the model a bit of context (e.g. This house believes that Kazakhstan).

              Additionally, you can control the temperature of generation.
              Low temperatures result in more predictable text.
              Higher temperatures result in more surprising text.
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
