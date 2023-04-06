import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getExercises } from '../../firebase/exercise';
import { addExerciseToTraining } from '../../firebase/exercise';
import { Exercise } from '../../types';
import { Card } from '../core/Card';
import { ExerciseCard } from '../exercise/ExerciseCard';

export function AddExercise() {
  const { id } = useParams();

  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    getExercises(id, true).then((exercises) => {
      // TODO find a way to do this filter at db
      const filtered = exercises.filter(
        (exercise) => id && !exercise.trainings?.includes(id),
      );
      setExercises(filtered);
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-2xl">Scegli un esercizio da aggiungere</h1>

      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          onClick={() => {
            addExercise(exercise.id);
          }}
        >
          <ExerciseCard exercise={exercise} />
        </Card>
      ))}

      {exercises.length === 0 ? <p>Nessun esercizio da aggiungere</p> : null}
    </>
  );

  // *********
  async function addExercise(exerciseId: string): Promise<void> {
    if (!id) {
      return;
    }

    try {
      await addExerciseToTraining({ trainingId: id, exerciseId });
      navigate(`/training/${id}`);
    } catch (e) {
      // TODO handle error
      console.error(e);
    }
  }
}
