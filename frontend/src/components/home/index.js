import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MotionForm from './MotionForm';
import Navbar from '../navbar';
import aiIcon from '../../images/ai.svg'

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(2, 2),
  },
  container: {
    padding: theme.spacing(4, 0)
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

const Home = () => {
  const classes = useStyles();


  return (
    <div>
      <Navbar/>
      <Container className={classes.container}>
          <Grid
            container
          >

            <Grid item className={classes.item} lg={8} md={8} xs={12}>
              <Typography variant="h2">
                Generate debating motion
              </Typography >

              <Typography variant="h6">
                using state-of-the-art natural languange model.
              </Typography >
            </Grid>


            <Grid item className={classes.item} lg={4} md={4} xs={12} align="center">
              <img src={aiIcon} alt="AI Icon" width="256" height="256"/>
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
