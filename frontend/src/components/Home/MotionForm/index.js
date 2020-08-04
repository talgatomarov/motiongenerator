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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";

import ModalMessage from "./ModalMessage.js";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    paddingTop: theme.spacing(6),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 6),
    outline: "none",
  },
  closeButton: {},
}));

const useMotions = () => {
  const [data, setData] = useState({
    error: null,
    isLoading: false,
    motions: [],
  });

  const fetchData = (prefix, temperature) => {
    setData({ ...data, isLoading: true, motions: [] });

    axios
      .post("/api/generate", { prefix: prefix, temperature: temperature })
      .then((response) => {
        setData({ ...data, isLoading: false, motions: response.data.motions });
      })
      .catch((error) => {
        setData({ ...data, isLoading: false, error: error });
      });
  };
  return [data, fetchData];
};

const MotionForm = () => {
  const classes = useStyles();

  const [prefix, setPrefix] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [data, fetchData] = useMotions([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(prefix, temperature);
    setOpen(true);
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
                title={
                  <span style={{ fontSize: "12px" }}>
                    Low temperatures result in more predictable text. Higher
                    temperatures result in more surprising text.
                  </span>
                }
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        data-testid="motion-modal"
      >
        <Fade in={open}>
          <Paper className={classes.modalPaper}>
            <Grid container spacing={2} direction="row">
              <Grid item xs={11}>
                <p>Generated Motions</p>
              </Grid>

              <Grid item xs={1}>
                <Button
                  className={classes.closeButton}
                  onClick={() => setOpen(false)}
                  data-testid="close-button"
                >
                  <CloseIcon />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <ModalMessage data={data} />
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default MotionForm;
