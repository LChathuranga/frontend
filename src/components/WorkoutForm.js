import React, { useState } from "react";
import methods from "../helpers/APIMethods";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

function WorkoutForm() {

  const {dispatch} = useWorkoutsContext()

  const [title, setTitle] = useState();
  const [load, setLoad] = useState();
  const [reps, setReps] = useState();
  const [error, setError] = useState();
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workouts = { title, load, reps };
    const fetchDataHandler = {
      method: methods.POST,
      body: JSON.stringify(workouts),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/workouts", fetchDataHandler);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("added", json);
      dispatch({type: 'CREATE_WORKOUTS', payload: json})
    }
  };

  return (
    <form className="create">
      <h3>Add a new workouts</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : '' }
      />

      <label>Excersize Load(kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : '' }
      />

      <label>Excersize Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : '' }
      />

      <button onClick={(e) => handleSubmit(e)}>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
