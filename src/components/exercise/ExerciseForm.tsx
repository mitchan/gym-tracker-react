import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createExercise, updateExercise } from '../../firebase/exercise';
import { Exercise, ExerciseFormState } from '../../types';
import { Button } from '../core/Button';
import { InputText } from '../core/input/InputText';

type ExerciseFormProps = {
  exercise?: Exercise;
};

export function ExerciseForm(props: ExerciseFormProps) {
  const { exercise } = props;

  const [formState, setFormState] = React.useState<ExerciseFormState>({
    title: exercise?.title ?? '',
    serie: exercise?.serie ?? '',
    recovery: exercise?.recovery ?? 0,
    weight: exercise?.weight ?? 0,
    notes: exercise?.notes ?? '',
  });
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // TODO add validation
    try {
      if (exercise) {
        await updateExercise(exercise.id, formState);
      } else {
        await createExercise(formState);
      }
      navigate(-1);
    } catch (error) {
      // TODO handle error
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputText
          name="title"
          label="Nome"
          value={formState.title}
          onChange={(value) => {
            setFormState((oldState) => ({
              ...oldState,
              title: value,
            }));
          }}
        />

        <InputText
          name="serie"
          label="Serie"
          value={formState.serie}
          onChange={(value) => {
            setFormState((oldState) => ({
              ...oldState,
              serie: value,
            }));
          }}
        />

        <InputText
          type="number"
          name="recovery"
          label="Recupero"
          value={formState.recovery}
          onChange={(value) => {
            setFormState((oldState) => ({
              ...oldState,
              recovery: value ? Number(value) : 0,
            }));
          }}
        />

        <InputText
          name="weight"
          type="number"
          label="Peso"
          value={formState.weight}
          onChange={(value) => {
            setFormState((oldState) => ({
              ...oldState,
              weight: Number(value),
            }));
          }}
        />

        <InputText
          name="notes"
          label="Note"
          value={formState.notes ?? ''}
          onChange={(value) => {
            setFormState((oldState) => ({
              ...oldState,
              notes: value,
            }));
          }}
        />

        <Button
          label={props.exercise ? 'Modifica' : 'Crea'}
          type="submit"
          disabled={loading}
        />
      </form>
    </>
  );
}
