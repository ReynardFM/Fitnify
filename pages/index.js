import React from 'react';
import Header from './components/headerComponent';
import Muscle from './components/muscle';
import FitnessLevel from './components/fitnessLevel';
import Body from './components/bodyComponent';
import {useState} from 'react';
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });

const pageOrganization = {
  display: "flex",
  justifyContent: "center",  
  alignItems: "center",      
  flexDirection: "row"
}

const mainPageText = {
  fontSize: "40px"
}

export default function Home() {
  const [unit, setUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({age:"", height:"", weight:""});
  const [route, setRoute] = useState("")
  const [equipments, setEquipments] = useState('');
  const [goal, setGoal] = useState('stronger');
  const [secondForm, showSecondForm] = useState (false);
  
  return (
    <>
      <Header/>
      <div style={pageOrganization}>
        <div>
          <FitnessLevel secondForm = {secondForm} showSecondForm = {showSecondForm} goal = {goal} setGoal = {setGoal} equipments = {equipments} setEquipments ={setEquipments} results = {results} errors ={errors} unit = {unit} gender = {gender} age = {age} height = {height} weight = {weight} activityLevel = {activityLevel} setUnit = {setUnit} setGender = {setGender} setAge = {setAge} setHeight = {setHeight} setWeight = {setWeight} setActivityLevel = {setActivityLevel} setResults = {setResults} setErrors = {setErrors}/>
        </div>
        <div>
          <Body />
        </div>
      </div>
    </>
  );
}
