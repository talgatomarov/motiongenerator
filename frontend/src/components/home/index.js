import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MotionForm from './MotionForm';
import Navbar from '../navbar';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(2),
  },
  container: {
    padding: '128px 0'
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

const Home = () => {
  const classes = useStyles();


  return (
    <div>
      <Container className={classes.container}>
      <Navbar/>
          <Grid
            container
            direction={"column"}
          >

            <Grid item className={classes.item} xs={12}>
            <Typography variant="h2">
              Generate debating motion
            </Typography >
            <Typography variant="h6">
              using state-of-the-art natural languange model.
            </Typography >
            </Grid>


            <Grid item className={classes.item} xs={12}>
            <Typography variant="body1">
              Enter beginning of the motion:
            </Typography>
            </Grid>

            <Grid item className={classes.item} xs={12}>
              <MotionForm/>
            </Grid>
          </Grid>
      </Container>
    </div>
  );
};

export default Home
