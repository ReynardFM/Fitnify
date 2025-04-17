import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });

// Styles moved to separate object
const styles = {
  formContainer: {
    width: "400px",
    height: "100%",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    margin: "40px",
    padding: "30px",
    borderRadius: "20px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    marginTop: "140px"
  },
  formSelector: {
    display: "flex",
    flexDirection: "column"
  },
  radioGroup: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  resultsStyle: {
    margin: "10px 0",
    fontSize: "16px",
    fontWeight: "800"
  }
};

const activityMultipliers = [
  1.2,
  1.375,
  1.55,
  1.725,
  1.9
];

// Reusable form input component
const FormInput = ({ label, type = "number", value, placeholder, onChange, error, selectOptions }) => {
  return (
    <div style={styles.formSelector}>
      <label>{label}</label>
      {selectOptions ? (
        <select value={value} onChange={onChange} className="formInput">
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="formInput"
        />
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

// Reusable radio group component
const RadioGroup = ({ label, name, value, options, onChange }) => {
  return (
    <div style={styles.formSelector}>
      <label>{label}</label>
      <div style={styles.radioGroup}>
        {options.map(option => (
          <span key={option.value}>
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span style={{ marginLeft: "5px" }}>{option.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default function FitnessLevel({ showSecondForm, secondForm, data, setData, errors, setErrors, setSubmit }) {
  const validateInputs = () => {
    const { age, height, weight } = data;
    const newErrors = { age: "", height: "", weight: "" };
    let hasErrors = false;
    
    if (!age || age < 15 || age > 80) {
      newErrors.age = "Please enter a valid age (15-80)";
      hasErrors = true;
    }
    if (!height || height <= 0) {
      newErrors.height = "Please enter a valid height";
      hasErrors = true;
    } 
    if (!weight || weight <= 0) {
      newErrors.weight = "Please enter a valid weight";
      hasErrors = true;
    }
    
    setErrors(newErrors);
    return hasErrors;
  };

  const validateSecondFormInputs = () => {
    const { equipments } = data;
    const newErrors = { equipments: "" };
    let hasErrors = false;
  
    if (!equipments || equipments < 0) {
      newErrors.equipments = "Please enter a valid number of equipments";
      hasErrors = true;
    }
  
    setErrors(newErrors);
    return hasErrors;
  };
  
  const handleSecondFormSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
  
    const hasErrors = validateSecondFormInputs();
  
    if (!hasErrors) {
      setSubmit(true); // Proceed with submission logic
    }
  };

  const handleInputChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
  };

  const calculateResult = (event) => {
    event.preventDefault();     
    const { unit, age, height, weight, gender, activityLevel } = data;
    const hasErrors = validateInputs();
    
    if (!hasErrors) {
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

      setData({ 
        ...data, 
        results: { 
          bmi: parseFloat(bmi.toFixed(1)),
          bmr: Math.round(bmr),
          tdee: Math.round(tdee)
        }
      });
    } else {
      setData({ ...data, results: null });
    }
  };

  // Form options data
  const unitOptions = [
    { value: 'metric', label: 'Metric (cm, kg)' },
    { value: 'imperial', label: 'Imperial (inches, lbs)' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const activityOptions = [
    { value: '0', label: 'Office job (No exercise)' },
    { value: '1', label: 'Light exercise (1-2 days/week)' },
    { value: '2', label: 'Moderate exercise (3-5 days/week)' },
    { value: '3', label: 'Active (All week)' },
    { value: '4', label: 'Very active (All week but 2x per day)' }
  ];

  const goalOptions = [
    { value: 'stronger', label: 'Get Stronger' },
    { value: 'muscle gain', label: 'Build Muscle Mass' },
    { value: 'become lean_defined', label: 'Get Lean and Defined' },
    { value: 'reduce bodyWeight', label: 'Reduce BodyWeight' },
    { value: 'improve health', label: 'Improve Health and Wellness' },
    { value: 'boost sports performance', label: 'Boost Sports Performance' }
  ];

  const fitnessLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advance', label: 'Advance' }
  ];

  return (
    <div style={styles.formContainer}>
      {!secondForm ? (  
        <form onSubmit={calculateResult}>
          <RadioGroup
            label="Select preferred measuring system:"
            name="unit"
            value={data.unit}
            options={unitOptions}
            onChange={(value) => setData({ ...data, unit: value })}
          />

          <RadioGroup
            label="Select your gender:"
            name="gender"
            value={data.gender}
            options={genderOptions}
            onChange={(value) => setData({ ...data, gender: value })}
          />

          <FormInput
            label="Your age:"
            value={data.age}
            placeholder="Enter your age"
            onChange={handleInputChange('age')}
            error={errors.age}
          />

          <FormInput
            label="Your weight:"
            value={data.weight}
            placeholder="Enter your weight"
            onChange={handleInputChange('weight')}
            error={errors.weight}
          />

          <FormInput
            label="Your height:"
            value={data.height}
            placeholder="Enter your height"
            onChange={handleInputChange('height')}
            error={errors.height}
          />

          <FormInput
            label="Activity Level:"
            value={data.activityLevel}
            onChange={handleInputChange('activityLevel')}
            selectOptions={activityOptions}
          />

          <button type="submit" className={`calculateButton ${outfit.className}`}>
            CALCULATE
          </button>

          {data.results && (
            <div>
              <h1 style={styles.resultsStyle}>Results:</h1>
              <p><b>BMI: </b>{data.results.bmi}</p>
              <p><b>BMR: </b>{data.results.bmr} calories/day</p>
              <p><b>TDEE: </b>{data.results.tdee} calories/day</p>

              <button 
                type="button" 
                onClick={() => showSecondForm(true)}
                className={`calculateButton ${outfit.className}`}
              >
                NEXT
              </button>
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleSecondFormSubmit}>
          <FormInput
            label="What is your goal of doing exercise?"
            value={data.goal}
            onChange={handleInputChange('goal')}
            selectOptions={goalOptions}
          />

          <FormInput
            label="How many weights or gym equipment do you have?"
            value={data.equipments}
            placeholder="Enter the amount of your equipments"
            onChange={handleInputChange('equipments')}
            error={errors.equipments}
          />

          <FormInput
            label="What is your level of fitness?"
            value={data.level}
            onChange={handleInputChange('level')}
            selectOptions={fitnessLevelOptions}
          />

          <button 
            type="button" 
            onClick={() => showSecondForm(false)}
            className={`calculateButton ${outfit.className}`}
          >

            BACK
          </button>
          <button 
            type="submit" 
            className={`calculateButton ${outfit.className}`}
          >
            SUBMIT
          </button>
        </form>
      )}
    </div>
  );
}