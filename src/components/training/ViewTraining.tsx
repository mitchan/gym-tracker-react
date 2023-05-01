import { useNavigate, useParams } from 'react-router-dom';

import { useTrainingWithExercises } from '../../hooks/useTrainingWithExercises';
import { Button } from '../core/Button';
import { Card } from '../core/Card';
import { ExerciseCard } from '../exercise/ExerciseCard';

export function ViewTraining() {
  const { id } = useParams();

  const { exercises, resetCount, toggleDone } = useTrainingWithExercises({
    id,
    showOnlyAdded: true,
  });

  const navigation = useNavigate();

  return (
    <>
      <h1 className="text-2xl">Schede</h1>

      {exercises.length > 0 && (
        <Button
          label="Reset"
          extraClasses="mb-2"
          onClick={() => {
            resetCount();
          }}
        />
      )}

      {exercises
        .filter((exercise) => !exercise.done)
        .map((exercise) => (
          <Card key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              onToggleDone={() => {
                toggleDone(exercise);
              }}
              showCount
              showCheckbox
            />
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
