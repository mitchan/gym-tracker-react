'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { updateExercise } from '../../firebase/exercise';
import { Exercise } from '../../types';

type ExerciseCountProps = {
  exercise: Exercise;
};

const btn_class_name = `flex-1 flex justify-center`;

export function ExerciseCount(props: ExerciseCountProps) {
  const { exercise } = props;

  const [count, setCount] = React.useState(exercise.count ?? 0);

  React.useEffect(() => {
    if (exercise.count !== count) {
      setCount(exercise.count);
    }
  }, [exercise]);

  function updateCount(value: number) {
    updateExercise(exercise.id, { count: value })
      .then(() => {
        setCount(value);
      })
      .catch((error) => {
        // TODO log error
        console.error(error);
      });
  }

  return (
    <div className="mt-2 flex justify-around items-center">
      <button
        className={btn_class_name}
        disabled={count === 0}
        onClick={() => updateCount(count - 1)}
      >
        <MinusIcon className="h-6 w-6" />
      </button>

      {count}

      <button className={btn_class_name} onClick={() => updateCount(count + 1)}>
        <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
