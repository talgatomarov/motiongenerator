import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  },
}));


const MotionForm = () => {
  const classes = useStyles();

  const [prompt_, setPrompt] = useState("");
  const [motion, setMotion] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({prompt: prompt_, temperature: temperature})
    }

    fetch('/api/motion', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setMotion(data.motion);
        })
        .then(() => {
            console.log(motion)
            setOpen(true);
        })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} direction="row">
          <Grid item xs={12} md={8}>
            <TextField
              id="standard-basic"
              label="Motion"
              fullWidth
              multiline
              variant="outlined"
              onChange={e => setPrompt(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography id="discrete-slider" gutterBottom>Temperature</Typography>
            <Slider
              defaultValue={0.7}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={0.1}
              marks
              min={0.1}
              max={0.9}
              onChange={e => setTemperature(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button type="submit" variant="contained" color="primary">Generate</Button>
          </Grid>
        </Grid>
      </form>

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
            <Typography variant="body1" gutterBottom>
              {motion}
            </Typography>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default MotionForm
