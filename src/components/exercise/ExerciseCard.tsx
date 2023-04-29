import { Exercise } from '../../types';
import { Checkbox } from '../core/input/Checkbox';
import { ExerciseCount } from './ExerciseCount';

type ExerciseCardProps = {
  exercise: Exercise;
  showCount?: boolean;
  showCheckbox?: boolean;
};

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, showCount, showCheckbox } = props;

  return (
    <>
      <div className="flex flex-col justify-between mb-5">
        <div className="flex-1 flex justify-start items-center gap-1">
          {showCheckbox && <Checkbox />}
          <h2 className="text-xl truncate max-w-full">{exercise.title}</h2>
        </div>

        {exercise.serie}
      </div>

      <ul>
        <li>Recupero: {exercise.recovery}</li>
        {exercise.weight > 0 && <li>Peso: {exercise.weight} Kg</li>}
        {exercise.notes && <li>{exercise.notes}</li>}
      </ul>

      {showCount && <ExerciseCount exercise={exercise} />}
    </>
  );
}
