import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  },
  title: {
    paddingBottom: theme.spacing(2)
  },
  text: {
    lineHeight: "32px",
    fontWeight: 300
  }
}));

const Helper = (props) => {
  const classes = useStyles();

  return ( 
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        {props.title}
      </Typography>

      <Typography variant="body2" className={classes.text}>
        {props.children}
      </Typography>
    </Paper>
  );
};

export default Helper
