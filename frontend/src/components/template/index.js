import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './footer'
import Header from './header'


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4, 3)
  },
}));


const Template = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Header/>
      { props.children }
      <Footer/>
    </Container>
  );
};

export default Template;
