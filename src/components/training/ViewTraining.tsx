import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { updateTraining } from '../../firebase/training';
import { useTrainingWithExercises } from '../../hooks/useTrainingWithExercises';
import { Exercise } from '../../types';
import { Button } from '../core/Button';
import { Card } from '../core/Card';
import { ExerciseCard } from '../exercise/ExerciseCard';
import styles from './ViewTraining.module.css';

export function ViewTraining() {
  const { id } = useParams();

  const { exercises, resetCount, toggleDone } = useTrainingWithExercises({
    id,
    showOnlyAdded: true,
  });

  const { done, undone } = React.useMemo(
    () =>
      exercises.reduce<{ done: Exercise[]; undone: Exercise[] }>(
        (acc, exercise) => {
          if (exercise.done) {
            acc.done.push(exercise);
          } else {
            acc.undone.push(exercise);
          }

          return acc;
        },
        { done: [], undone: [] },
      ),
    [exercises],
  );

  React.useEffect(() => {
    if (!id) {
      return;
    }

    // update last opened at
    updateTraining(id, { lastOpenedAt: new Date().getTime() }).catch(
      (error) => {
        console.error(error);
      },
    );
  }, [id]);

  const navigation = useNavigate();

  return (
    <>
      <h1>Schede</h1>

      {exercises.length > 0 && (
        <Button
          label="Reset"
          extraClasses={styles['reset-button']}
          onClick={() => {
            resetCount();
          }}
        />
      )}

      {undone.map((exercise) => (
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

      {done.length > 0 && <h6>Esercizi completati</h6>}

      {done.map((exercise) => (
        <Card key={exercise.id}>
          <ExerciseCard
            exercise={exercise}
            onToggleDone={() => {
              toggleDone(exercise);
            }}
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

      <Button
        label="Cancella scheda"
        onClick={() => {
          navigation(`/training/${id}/delete`, {
            preventScrollReset: false,
          });
        }}
      />
    </>
  );
}
