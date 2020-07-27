import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {analytics} from '../../base.js';

import MotionModal from './MotionModal'


const MotionForm = () => {
  const [prefix, setPrefix] = useState("");
  const [motions, setMotions] = useState([]);
  const [temperature, setTemperature] = useState(0.7);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setOpen(true);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({prefix  : prefix, temperature: temperature})
    }

    fetch('/api/generate', requestOptions)
        .then(response => response.json())
        .then(data => {
          setMotions(data.motions);
          analytics.logEvent('generate_motions', {generated_motions: motions, input_motion: prefix});
        })
        .then(() => {
          setLoading(false);
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
              placeholder="This house believes that"
              fullWidth
              multiline
              variant="outlined"
              onChange={e => setPrefix(e.target.value)}
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
      <MotionModal
        open={open}
        setOpen={setOpen}
        motions={motions}
        setMotions={setMotions}
        loading={loading}
      />
    </div>
  );
};

export default MotionForm;
