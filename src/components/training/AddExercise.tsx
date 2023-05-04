import { useNavigate, useParams } from 'react-router-dom';

import { addExerciseToTraining } from '../../firebase/training';
import { useFilteredExercises } from '../../hooks/useFilteredExercises';
import { useTrainingWithExercises } from '../../hooks/useTrainingWithExercises';
import { Card } from '../core/Card';
import { InputText } from '../core/input/InputText';
import { ExerciseCard } from '../exercise/ExerciseCard';

export function AddExercise() {
  const { id } = useParams();

  const { exercises } = useTrainingWithExercises({ id });

  const { debouceChange, filteredExercises } = useFilteredExercises({
    exercises,
  });

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-2xl">Scegli un esercizio da aggiungere</h1>

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
        <Card
          key={exercise.id}
          onClick={() => {
            addExercise(exercise.id);
          }}
        >
          <ExerciseCard exercise={exercise} />
        </Card>
      ))}

      {exercises.length === 0 ? <p>Nessun esercizio da aggiungere</p> : null}
    </>
  );

  // *********
  async function addExercise(exerciseId: string): Promise<void> {
    if (!id) {
      return;
    }

    try {
      await addExerciseToTraining({ trainingId: id, exerciseId });
      navigate(`/training/${id}`);
    } catch (e) {
      // TODO handle error
      console.error(e);
    }
  }
}
