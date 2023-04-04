import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createTraining } from '../../firebase/training';
import { Training } from '../../types';
import { Button } from '../core/Button';
import { InputText } from '../core/input/InputText';

type TrainingFormProps = {
  training?: Training;
};

export function TrainingForm(props: TrainingFormProps) {
  const { training } = props;

  const [title, setTitle] = React.useState(training?.title ?? '');
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // TODO add validation

    try {
      if (training) {
        // TODO update
      } else {
        await createTraining(title);
        navigate('/');
      }
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
          value={title}
          onChange={setTitle}
        />

        <Button
          label={props.training ? 'Modifica' : 'Crea'}
          type="submit"
          disabled={loading}
        />
      </form>
    </>
  );
}
