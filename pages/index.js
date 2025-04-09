import React from 'react';
import Header from './components/headerComponent';
import Muscle from './components/muscle';
import FitnessLevel from './components/fitnessLevel';
import Body from './components/bodyComponent';
import {useState} from 'react';

const pageOrganization = {
  display: "flex",
  flexDirection: "row"
}

export default function Home() {

  return (
    <>
      <Header/>
      <div style={pageOrganization}>
        <FitnessLevel/>
        <Body/>
      </div>
    </>
  );
}
