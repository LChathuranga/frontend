import React, { useEffect, useState } from "react";
import config from "../helpers/config";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

function Home() {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout.id} workout={workout} />
          ))}
      </div>
      <WorkoutForm/>
    </div>
  );
}

export default Home;
