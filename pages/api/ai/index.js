import React from 'react';
import { useEffect } from 'react';

export default function AiPage({data}) {
    let plan = [];

    useEffect(()=>{fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-distill-llama-70b:free",
          "messages": [
            {
              "role": "user",
              "content": `
      You are a smart fitness coach AI. Based on the following user profile, generate a customized daily exercise routine.
      
      Respond only with a valid JSON array of objects. Each object must have a "name" field:
      - "Day": different workout days in a training program.
      - "name": the exercise or activity, personalized to the user
      - Include "Set" and "Reps" for strength training exercises
      - Include "time" for cardio exercises and any warm-up or cool-down in minutes or seconds
      - Include "mainMuscle" for strength exercises to indicate the primary muscle group worked only for strength training exercises and not for cardio or warm-up/cool-down
      - do not include any other fields or explanations
    
      ### USER PROFILE:
      - Age: ${data.age}
      - Gender: ${data.gender}
      - Height: ${data.height} (${data.metric === "imperial" ? "inches" : "cm"})
      - Weight: ${data.weight} (${data.metric === "imperial" ? "pounds" : "kg"})
      - Activity Level: ${data.activityLevel} 
      - Fitness Goal: ${data.goal}
      - Fitness Level: ${data.level}
      - Equipment Available: ${data.equipments}
      - BMI: ${data.results.bmi}
      - TDEE: ${data.results.tdee}
      - BMR: ${data.results.bmr}
      
      Rules:
      - Tailor the activities to their fitness level and equipment access
      - Make sure the activities help them achieve their selected goal (e.g., weight loss, muscle gain, endurance)
      - Varied the exercises appropriately for their fitness level
      - Avoid generic or irrelevant routines
      - Keep the total daily workout under 90 minutes unless their activity level is "very active" or fitness level is "advanced"
      - Focus on compound movements, variety, and balance
      - Time should reflect logical training blocks (second, minute)
      - Activity level are as such 0: no activity, 1: 1-2/week, 2: 3-5/week, 3: once per day, 4: twice per day
      - Each day should have a different workout routine and not repeat the same exercises in a week
      
      Only return a JSON array. No extra explanation or formatting.
      Example format:
      
      [{ "Day": "1",
        "exercise":[{ "name": "Warm-Up Stretch", "time": "1 minute" },
        { "name": "Bodyweight Squats", "Set": "4" , "Reps": "8", "mainMuscle": "Legs" },
        { "name": "Dumbbell Shoulder Press", "Set": "4" , "Reps": "10", "mainMuscle": "Shoulders" }]
      },
      { "Day": "2",
        "exercise": [{ "name": "Cardio: Running", "time": "30 minutes" },
        { "name": "pull-ups", "Set": "4" , "Reps": "8", "mainMuscle": "Back" },
        { "name": "Cool Down Stretch", "time": "5 minutes" }]
      }]
      `
            }
          ]
        })
      })
      .then(response => response.json())
      .then(data => (plan = JSON.parse(data.choices[0].message.content)))
      .catch(error => console.error('Error:', error));
    },[]);
    // plan[] -> {day, exercise}
    // exercise[] -> {name, (Set, Reps or time), mainMuscle} i did
    return(
        <div className='daySchedule'>
            <h1>AI Generated Daily Exercise Routine</h1>
            {plan && <h1>{plan}</h1>}
        </div>
    );
}