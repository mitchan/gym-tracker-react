import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteTraining, getTraining } from '../../firebase/training';
import { Training } from '../../types';
import { Button } from '../core/Button';

export function DeleteTraining() {
  const { id } = useParams();

  const navigation = useNavigate();

  const [training, setTraining] = useState<Training | null>(null);

  useEffect(() => {
    if (typeof id !== 'string') {
      return;
    }

    getTraining(id)
      .then((training) => {
        if (training) {
          setTraining(training);
        }
      })
      .catch(() => {
        // NOOP
      });
  }, [id]);

  function onDelete() {
    if (!id) {
      return;
    }

    deleteTraining(id).then(() => {
      navigation('/');
    });
  }

  return (
    <div className="space-y-4">
      <h1>Cancella scheda</h1>

      {training ? (
        <>
          <p>
            Stai per cancellare: <strong>{training.title}</strong>
          </p>

          <Button
            label="Annulla"
            onClick={() => {
              navigation(-1);
            }}
          />

          <Button label="Conferma" onClick={onDelete} />
        </>
      ) : null}
    </div>
  );
}
