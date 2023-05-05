import React from 'react';
import { useParams } from 'react-router-dom';

import { getExerciseById } from '../../firebase/exercise';
import { Exercise } from '../../types';
import { ExerciseForm } from './ExerciseForm';

export function UpdateExercise() {
  const { id } = useParams();

  const [exercise, setExercise] = React.useState<Exercise | null>(null);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    getExerciseById(id).then((exercise) => {
      exercise && setExercise(exercise);
    });
  }, [id]);

  if (!exercise) {
    return null;
  }

  return (
    <>
      <ExerciseForm exercise={exercise} />
    </>
  );
}
