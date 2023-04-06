import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getExercises } from '../../firebase/exercise';
import { Exercise } from '../../types';
import { Button } from '../core/Button';
import { Card } from '../core/Card';
import { ExerciseCard } from './ExerciseCard';

export function ExerciseList() {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getExercises().then(setExercises);
  }, []);

  return (
    <>
      <h1 className="text-2xl">Esercizi</h1>

      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <ExerciseCard exercise={exercise} />
        </Card>
      ))}

      {exercises.length === 0 && <p>Non hai ancora creato nessun esercizio.</p>}

      <Button
        label="Crea esercizio"
        onClick={() => {
          navigate('/exercise/create');
        }}
      />
    </>
  );
}