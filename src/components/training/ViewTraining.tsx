import React from 'react';
import { useParams } from 'react-router-dom';

import { getExercises } from '../../firebase/exercise';
import { Exercise } from '../../types';

export function ViewTraining() {
  const { id } = useParams();
  console.log({ id });

  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    getExercises(id).then(setExercises);
  }, [id]);

  return (
    <>
      <h1 className="text-2xl">Schede</h1>

      {exercises.map((exercise) => (
        <div key={exercise.id}>{exercise.title}</div>
      ))}

      {exercises.length === 0 && (
        <p>Non hai ancora aggiunto nessun esercizio a questa scheda.</p>
      )}
    </>
  );
}
