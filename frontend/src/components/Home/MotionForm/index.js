import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { analytics } from "../../../base.js";

import MotionModal from "./MotionModal";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    paddingTop: theme.spacing(6),
  },
}));

const MotionForm = () => {
  const classes = useStyles();

  const [prefix, setPrefix] = useState("");
  const [motions, setMotions] = useState([]);
  const [temperature, setTemperature] = useState(0.7);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setOpen(true);

    axios
      .post("/api/generate", { prefix: prefix, temperature: temperature })
      //  .then(response => response.json())
      .then((response) => {
        setMotions(response.data.motions);
        analytics.logEvent("generate_motions", {
          generated_motions: motions,
          input_motion: prefix,
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} md={8}>
            <Typography variant="body1">
              Enter beginning of the motion:
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              id="standard-basic"
              label="Motion"
              placeholder="This house believes that"
              fullWidth
              multiline
              variant="outlined"
              onChange={(e) => setPrefix(e.target.value)}
              inputProps={{ "data-testid": "generate-text-field" }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography id="discrete-slider" gutterBottom>
              Temperature
              <Tooltip
                title="Low temperatures result in more predictable text. Higher temperatures result in more surprising text"
                placement="top"
              >
                <Button>
                  <HelpIcon style={{ fontSize: 16 }} color="primary" />
                </Button>
              </Tooltip>
            </Typography>
            <Slider
              defaultValue={0.7}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={0.1}
              marks
              min={0.1}
              max={0.9}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={12} className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="generate-button"
            >
              Generate
            </Button>
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
