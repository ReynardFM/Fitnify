import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/headerComponent/headerComponent.js';
import FitnessLevel from './components/fitnessLevel/fitnessLevel.js';
const LazyPlan = lazy(() => import('./components/ai/ai.js'));

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [data, setData] = useState({
    unit: 'metric',
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    activityLevel: '0',
    results: null,
    equipments: '',
    goal: 'stronger',
    level: 'beginner'
  });
  
  const [errors, setErrors] = useState({});
  const [secondForm, showSecondForm] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("Plan")) {
      setPlan(JSON.parse(localStorage.getItem("Plan")));
      setSubmit(true);
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{
        display: "flex",
        justifyContent: "center",  
        alignItems: "center",      
        flexDirection: "column"
      }}>
        {!submit ? (
          <FitnessLevel 
            secondForm={secondForm} 
            showSecondForm={showSecondForm} 
            data={data}
            setData={setData}
            errors={errors} 
            setErrors={setErrors}
            setSubmit={setSubmit}
          />
        ) : (
          <Suspense fallback="Loading...">
            <LazyPlan data={data} plan={plan} setPlan={setPlan} />
          </Suspense>
        )}
      </div>
    </>
  );
}