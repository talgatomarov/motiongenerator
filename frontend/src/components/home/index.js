import React from 'react'
import Template from '../template'
import Hero from './hero'
import MotionForm from './motion-form'

const Home = (props) => {
  return (
    <Template>
      <Hero/>
      <MotionForm/>
    </Template>
  );
};

export default Home;
