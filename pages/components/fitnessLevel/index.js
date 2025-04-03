import {useState} from 'react';
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });

const formContainer = {
    width: "400px",
    height: "100%",
    backdropFilter: "blur(5px)",
    backgroundColor: " rgba(255, 255, 255, 0.06)",
    margin: "40px",
    padding: "30px",
    borderRadius: "20px",
    border: "2px solid rgba(255, 255, 255, 0.2)"
}

const logo = {
    fontWeight: "600",
    fontSize: "30px",
    letterSpacing: "4px"
}

const formSelector = {
    display: "flex",
    flexDirection: "column"
}

const userSelector = {
    display: "flex",
    flexDirection: "row"
}

export default function FitnessLevel(){
    const [unit, setUnit] = useState('metric');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState({});
  
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9
    };
  
    const validateInputs = () => {
      const newErrors = {};
      
      if (!age || age < 15 || age > 80) newErrors.age = "Please enter a valid age (15-80)";
      if (!height || height <= 0) newErrors.height = "Please enter a valid height";
      if (!weight || weight <= 0) newErrors.weight = "Please enter a valid weight";
      
      setErrors(newErrors);
    };

    const CalculateResult = (event) => {
        event.preventDefault();        
        if (!validateInputs()) {
            console.log("Form submitted successfully!");
        // Convert to metric if necessary
        const weightKg = unit === 'metric' ? weight : weight * 0.453592;
        const heightM = unit === 'metric' ? height / 100 : height * 0.0254;

        // Calculate BMI
        const bmi = weightKg / (heightM * heightM);

        // Calculate BMR (Harris-Benedict Equation)
        let bmr;
        if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightM*100) - (5.677 * age);
        } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightM*100) - (4.330 * age);
        }

        // Calculate TDEE
        const tdee = bmr * activityMultipliers[activityLevel];

        setResults({
            bmi: parseFloat(bmi.toFixed(1)),
            bmr: Math.round(bmr),
            tdee: Math.round(tdee)
        });
        } else {
            console.log("Form validation failed");
        }
    }

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    }

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    }
    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    }

    return (
        <div style={formContainer}>
            <h1 className={outfit.className} style={logo}></h1>
            <form onSubmit={CalculateResult}> 
                <div style={formSelector}>
                <label>Select preferred measuring system:</label>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span>
                            <input
                                type="radio"
                                name="unit"
                                checked={unit === 'metric'}
                                onChange={() => setUnit('metric')}
                            />
                            <span style={{ marginLeft: "5px" }}>Metric (cm, kg)</span>
                        </span>
                        <span>
                            <input
                                type="radio"
                                name="unit"
                                checked={unit === 'imperial'}
                                onChange={() => setUnit('imperial')}
                            />
                            <span style={{ marginLeft: "5px" }}>Imperial (inches, lbs)</span>
                        </span>
                    </div>
                </div>

                <div style={formSelector}>
                <label>Select your gender:</label>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span>
                            <input
                                type="radio"
                                name="gender"
                                checked={gender === 'male'}
                                onChange={() => setGender('male')}
                            />
                            <span style={{ marginLeft: "5px" }}>Male</span>
                        </span>
                        <span>
                            <input
                                type="radio"
                                name="gender"
                                checked={gender === 'female'}
                                onChange={() => setGender('female')}
                            />
                            <span style={{ marginLeft: "5px" }}>Female</span>
                        </span>
                    </div>

                </div>

                <div>
                    <label>Your age: </label>
                    <input type = "number" 
                    value = {age} 
                    placeholder="Enter your age" 
                    onChange={handleAgeChange}
                    className='formInput'/>
                    {errors.age && <div>{errors.age}</div>}
                </div>

                <div>
                    <label>Your weight: </label>
                    <input type = "number" 
                    value = {weight} 
                    placeholder="Enter your weight" 
                    onChange={handleWeightChange}
                    className='formInput'/>
                    {errors.weight && <div>{errors.weight}</div>}
                </div>

                <div>
                    <label>Your height: </label>
                    <input type = "number" 
                    value = {height} placeholder="Enter your height" 
                    onChange={handleHeightChange}
                    className='formInput'/>
                    {errors.height && <div>{errors.height}</div>}
                </div>

                <div>
                    <label>Activity Level:</label>
                    <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    className='formInput'>

                        <option value="sedentary">Office job (No exercise)</option>
                        <option value="light">Light exercise (1-2 days/week)</option>
                        <option value="moderate">Moderate exercise (3-5 days/week)</option>
                        <option value="active">Active (All week)</option>
                        <option value="extreme">Very active (All week but 2x per day)</option>
                    </select>
                </div>
                <button type="submit" className={`calculateButton ${outfit.className}`}>CALCULATE</button>
                {results && (
                    <div>
                        <h3>Results</h3>
                        <p>BMI: {results.bmi}</p>
                        <p>BMR: {results.bmr} calories/day</p>
                        <p>TDEE: {results.tdee} calories/day</p>
                    </div>
                )}
            </form>

        </div>
    )
}

