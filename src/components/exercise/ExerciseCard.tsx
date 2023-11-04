import React from 'react';
import { Link } from 'react-router-dom';

import { Exercise } from '../../types';
import { Checkbox } from '../core/input/Checkbox';
import styles from './ExerciseCard.module.css';
import { ExerciseCount } from './ExerciseCount';

type ExerciseCardProps = {
  exercise: Exercise;
  showCount?: boolean;
  showCheckbox?: boolean;
  onToggleDone?: () => void;
};

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, showCount, showCheckbox } = props;

  return (
    <>
      <div className={styles.header}>
        {showCheckbox && (
          <Checkbox
            extraClasses="mr-2"
            checked={exercise.done}
            onChange={props.onToggleDone}
          />
        )}
        <Link to={`/exercise/${exercise.id}`} className={styles.link}>
          {exercise.title}
        </Link>
      </div>

      <ul>
        <li>Serie: {exercise.serie}</li>
        <li>Recupero: {exercise.recovery}</li>
        {exercise.weight > 0 && <li>Peso: {exercise.weight} Kg</li>}
        {exercise.notes && <li>{exercise.notes}</li>}
      </ul>

      {showCount && <ExerciseCount exercise={exercise} />}
    </>
  );
}
