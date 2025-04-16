export default function Test(){
  let workoutPlan = [{ "Day": "1",
    "exercise1": { "name": "Warm-Up Stretch", "time": "1 minute" },
    "exercise2": { "name": "Bodyweight Squats", "Set": "4" , "Reps": "8", "mainMuscle": "Legs" },
    "exercise3":{ "name": "Dumbbell Shoulder Press", "Set": "4" , "Reps": "10", "mainMuscle": "Shoulders" },
  },
  { "Day": "2",
    "exercise1": { "name": "Cardio: Running", "time": "30 minutes" },
    "exercise2": { "name": "pull-ups", "Set": "4" , "Reps": "8", "mainMuscle": "Back" },
    "exercise3": { "name": "Cool Down Stretch", "time": "5 minutes" }
  }];
  return(
    <div>
      <h1>Workout Plan</h1>
      <ul>
        {workoutPlan.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.time || `${exercise.Set} sets of ${exercise.Reps}`}
          </li>
        ))}
      </ul>
    </div>
  );
} 