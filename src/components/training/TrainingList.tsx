import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getTrainings } from '../../firebase/training';
import { Training } from '../../types';

export function TrainingList() {
  const [trainings, setTrainings] = React.useState<Training[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getTrainings().then(setTrainings);
  }, []);

  return (
    <>
      {trainings.map((training) => (
        <div
          key={training.id}
          onClick={() => {
            navigate(`/training/${training.id}`);
          }}
        >
          {training.title}
        </div>
      ))}
    </>
  );
}
