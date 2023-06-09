import React from 'react';

import { getExercises, updateExercise } from '../firebase/exercise';
import { getTraining } from '../firebase/training';
import { Exercise } from '../types';

type Param = {
  id?: string;
  showOnlyAdded?: boolean;
};

export function useTrainingWithExercises(param: Param) {
  const { id, showOnlyAdded } = param;

  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    if (!id) {
      setExercises([]);
      return;
    }

    // load training and exercises
    Promise.all([getTraining(id), getExercises()])
      .then((value) => {
        const [training, exercises] = value;

        if (!training) {
          setExercises([]);
          return;
        }

        if (showOnlyAdded) {
          const mapped =
            training.exercises?.map((id) => {
              const found = exercises.find((exercise) => exercise.id === id);
              if (!found) {
                throw new Error(`Exercise with id ${id} not found`);
              }
              return found;
            }) ?? [];
          setExercises(mapped);
        } else {
          const filtered = exercises.filter(
            (exercise) => !training.exercises?.includes(exercise.id),
          );
          setExercises(filtered);
        }
      })
      .catch((error) => {
        // TODO handle error
        console.error(error);
        setExercises([]);
      });
  }, [id]);

  async function resetCount(): Promise<void> {
    const promises = exercises.map((exercise) =>
      updateExercise(exercise.id, {
        count: 0,
        done: false,
      }),
    );

    await Promise.all(promises);

    setExercises(
      exercises.map((exercise) => ({
        ...exercise,
        count: 0,
        done: false,
      })),
    );
  }

  async function toggleDone(exercise: Exercise): Promise<void> {
    await updateExercise(exercise.id, {
      done: !exercise.done,
    });

    const newExercises = exercises.map((e) => {
      if (e.id === exercise.id) {
        return {
          ...exercise,
          done: !exercise.done,
        };
      }
      return e;
    });

    setExercises(newExercises);
  }

  return { exercises, resetCount, toggleDone };
}
