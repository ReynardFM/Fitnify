import React from 'react';
import Header from './components/headerComponent';
import Muscle from './components/muscle';
import FitnessLevel from './components/fitnessLevel';
import Body from './components/bodyComponent';
import {useState, useEffect} from 'react';
import { Outfit } from "next/font/google";
import Test from './api';
import { lazy, Suspense } from 'react';
const LazyPlan = lazy(() => import('./api/ai'));
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
  const [Plan, setPlan] = useState(null);
  const [data, setData] = useState({
    unit:'metric',
    gender:'male',
    age:'',
    height:'',
    weight:'',
    activityLevel:'sedentary',
    results:null,
    equipments:'',
    goal:'stronger',
    level:'beginner'
  })

  
  const [errors, setErrors] = useState({age:"", height:"", weight:""});
  const [secondForm, showSecondForm] = useState (false);
  const [submit, setSubmit] = useState (false);
  return (
    <>
      <Header/>
      <div style={pageOrganization}>
        {!submit && <div>
          <FitnessLevel secondForm = {secondForm} 
          showSecondForm = {showSecondForm} 
          data = {data}
          setData = {setData}
          errors ={errors} 
          setErrors = {setErrors}
          setSubmit = {setSubmit}
          />
        </div>}
        {submit && <div>
          <Suspense fallback={"Loooooaaaading........"}>
            <LazyPlan data = {data}/>
          </Suspense>
        </div>}
        <div>
          
          {/*<Body />*/}
        </div>
      </div>
    </>
  );
}
