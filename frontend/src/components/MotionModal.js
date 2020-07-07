import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import MotionList from './MotionList'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none'
  },
}));

const MotionModal = ({open, setOpen, motions, setMotions, loading}) => {
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMotions([]);
  };

  const LoadingMessage = () => {
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} align="center">
            <Typography variant="body1" gutterBottom>
              The motions are being generated. It make take a while.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} align="center">
            <CircularProgress size={24} />
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <p>Generated Motions</p>
          {loading && <LoadingMessage/>}
          <MotionList motions={motions}/>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MotionModal;
