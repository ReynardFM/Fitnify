import React from 'react';
import Header from './components/headerComponent/headerComponent';
import Muscle from './components/muscle';
import FitnessLevel from './components/fitnessLevel/fitnessLevel';
import {useState, useEffect} from 'react';
import { Outfit } from "next/font/google";
import { lazy, Suspense } from 'react';
const LazyPlan = lazy(() => import('./api/ai/ai'));
const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });
const pageOrganization = {
  display: "flex",
  justifyContent: "center",  
  alignItems: "center",      
  flexDirection: "column"
}

const mainPageText = {
  fontSize: "40px"
}

export default function Home() {
  
  const [plan, setPlan] = useState(null);
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
  
  
  const [errors, setErrors] = useState({age:"", height:"", weight:"", equipments:""});
  const [secondForm, showSecondForm] = useState (false);
  const [submit, setSubmit] = useState (false);
  useEffect(()=>{
    if(localStorage.getItem("Plan")){
      setPlan(JSON.parse(localStorage.getItem("Plan")));
      setSubmit(true);
    }
  },[])

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
            <LazyPlan data = {data} plan={plan} setPlan={setPlan}/>
          </Suspense>
        </div>}
        <div>
          
          {/*<Body />*/}
        </div>
      </div>
    </>
  );
}
