import { Exercise } from '../../types';
import { ExerciseCount } from './ExerciseCount';

type ExerciseCardProps = {
  exercise: Pick<
    Exercise,
    'id' | 'title' | 'recovery' | 'serie' | 'weight' | 'notes'
  >;
  showCount?: boolean;
};

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, showCount } = props;

  return (
    <>
      <div className="flex justify-between items-end mb-5">
        <h2 className="text-xl truncate w-3/4">{exercise.title}</h2>

        {exercise.serie}
      </div>

      <ul>
        <li>Recupero: {exercise.recovery}</li>
        {exercise.weight > 0 && <li>Peso: {exercise.weight} Kg</li>}
        {exercise.notes && <li>{exercise.notes}</li>}
      </ul>

      {showCount && <ExerciseCount exerciseId={exercise.id} />}
    </>
  );
}
