import { Exercise } from '../../types';
import { Checkbox } from '../core/input/Checkbox';
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
      <div className="flex-1 flex justify-start items-center gap-1 mb-2">
        {showCheckbox && (
          <Checkbox
            extraClasses="mr-2"
            checked={exercise.done}
            onChange={props.onToggleDone}
          />
        )}
        <h2 className="text-xl truncate max-w-full">{exercise.title}</h2>
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
