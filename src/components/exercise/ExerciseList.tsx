import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getExercises } from '../../firebase/exercise';
import { useFilteredExercises } from '../../hooks/useFilteredExercises';
import { Exercise } from '../../types';
import { Button } from '../core/Button';
import { Card } from '../core/Card';
import { InputText } from '../core/input/InputText';
import { ExerciseCard } from './ExerciseCard';

export function ExerciseList() {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getExercises().then((exercises) => {
      setExercises(exercises);
    });
  }, []);

  const { debouceChange, filteredExercises } = useFilteredExercises({
    exercises,
  });

  return (
    <>
      <h1 className="text-2xl">Esercizi</h1>

      <Button
        label="Crea esercizio"
        extraClasses="mb-2"
        onClick={() => {
          navigate('/exercise/create');
        }}
      />

      {exercises.length > 0 && (
        <InputText
          label="Cerca"
          name="search"
          extraContainerClasses="mb-2"
          onChange={debouceChange}
          hideLabel
        />
      )}

      {filteredExercises.map((exercise) => (
        <Card key={exercise.id}>
          <ExerciseCard exercise={exercise} />
        </Card>
      ))}

      {exercises.length === 0 && <p>Non hai ancora creato nessun esercizio.</p>}
    </>
  );
}
