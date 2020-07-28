import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import MotionForm from './MotionForm';
import Navbar from '../navbar';
import aiIcon from '../../images/ai.svg'

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(2, 0),
  },
  container: {
    padding: theme.spacing(4, 3)
  },
  heroMain: {
    paddingBottom: theme.spacing(2),
    fontWeight: 400
  },
  helper: {
    padding: theme.spacing(3),
  },
  helperTitle: {
    paddingBottom: theme.spacing(2)
  },
  helperText: {
    lineHeight: "32px",
    fontWeight: 300
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
          <Grid container spacing={6}>
            <Grid item className={classes.item} lg={8} md={8} xs={12}>
              <Typography variant="h2" className={classes.heroMain}>
                Generate debating motion
              </Typography >

              <Typography variant="h5">
                using state-of-the-art natural languange model.
              </Typography >
            </Grid>


            <Grid item className={classes.item} lg={4} md={4} xs={12} align="center">
              <img src={aiIcon} alt="AI Icon" width="192" height="192"/>
            </Grid>

            <Grid item className={classes.item} xs={12}>
            <Typography variant="body1">
              Enter beginning of the motion:
            </Typography>
            </Grid>

            <Grid item className={classes.item} xs={12}>
              <MotionForm/>
            </Grid>

            <Grid item className={classes.item} lg={6} md={6} xs={12}>
              <Paper className={classes.helper}>
                <Typography variant="h6" className={classes.helperTitle}>
                  What is a debating motion?
                </Typography>
                <Typography variant="body2" className={classes.helperText}>
                  A motion, also known as a proposition or resolution, is a statement that usually sets the topic for the given debate. It usually looks like: <i>"This house would ban gun ownership"</i> or <i>"This house believes that charities should not accept money from donors they consider immoral"</i>.
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item} lg={6} md={6} xs={12}>
              <Paper className={classes.helper}>
                <Typography variant="h6" className={classes.helperTitle}>
                  What is a natural language model?
                </Typography>
                <Typography variant="body2" className={classes.helperText}>
                  A statistical language model is a probability distribution over sequences of words. It can be used to predict the next most probable word(s). The model used in this web-application is based upon distillGPT2 model.
                </Typography>
              </Paper>
            </Grid>

            <Grid item className={classes.item} lg={6} md={6} xs={12}>
            </Grid>
          </Grid>
      </Container>
    </div>
  );
};

export default Home
