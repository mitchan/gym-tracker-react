import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getTrainings } from '../../firebase/training';
import { Training } from '../../types';
import { Button } from '../core/Button';
import { Card } from '../core/Card';

export function TrainingList() {
  const [trainings, setTrainings] = React.useState<Training[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getTrainings().then(setTrainings);
  }, []);

  return (
    <>
      <h1 className="text-2xl">Schede</h1>

      {trainings.map((training) => (
        <Card
          key={training.id}
          onClick={() => {
            navigate(`/training/${training.id}`);
          }}
        >
          {training.title}
        </Card>
      ))}

      <Button
        label="Crea scheda"
        onClick={() => {
          navigate('/training/create');
        }}
      />

      <Button
        label="Esercizi"
        onClick={() => {
          navigate('/exercise');
        }}
      />
    </>
  );
}
