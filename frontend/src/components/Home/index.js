import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Template from "../Template";
import Hero from "./Hero";
import Grid from "@material-ui/core/Grid";
import MotionForm from "./MotionForm";
import Helper from "./Helper";

const useStyles = makeStyles((theme) => ({
  helperContainer: {
    paddingTop: theme.spacing(4),
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Template>
      <Hero />

      <MotionForm />

      <Grid container spacing={6} className={classes.helperContainer}>
        <Grid item lg={6} md={6} xs={12}>
          <Helper title="What is a debating motion?">
            A motion, also known as a proposition or resolution, is a statement
            that usually sets the topic for the given debate{" "}
            <a href="https://en.wikibooks.org/w/index.php?title=Debate/Motions_and_resolutions&oldid=3577350">
              [1]
            </a>
            . It usually looks like: <i>"This house would ban gun ownership"</i>{" "}
            or{" "}
            <i>
              "This house believes that charities should not accept money from
              donors they consider immoral"
            </i>
            .
          </Helper>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Helper title="What is a natural language model?">
            A statistical language model is a probability distribution over
            sequences of words. It can be used to predict the next most probable
            word(s), and thus, to generate some text. The model used in this
            web-application is based upon distillGPT2 model{" "}
            <a href="https://transformer.huggingface.co/model/distil-gpt2">
              [2]
            </a>
            .
          </Helper>
        </Grid>
      </Grid>
    </Template>
  );
};

export default Home;
