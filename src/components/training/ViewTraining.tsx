import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getExercises } from '../../firebase/exercise';
import { Exercise } from '../../types';
import { Button } from '../core/Button';
import { Card } from '../core/Card';
import { ExerciseCard } from '../exercise/ExerciseCard';

export function ViewTraining() {
  const { id } = useParams();

  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    getExercises(id).then(setExercises);
  }, [id]);

  const navigation = useNavigate();

  return (
    <>
      <h1 className="text-2xl">Schede</h1>

      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <ExerciseCard exercise={exercise} showCount />
        </Card>
      ))}

      {exercises.length === 0 && (
        <p>Non hai ancora aggiunto nessun esercizio a questa scheda.</p>
      )}

      <Button
        label="Aggiungi esercizio"
        onClick={() => {
          navigation(`/training/${id}/add-exercise`);
        }}
      />
    </>
  );
}
