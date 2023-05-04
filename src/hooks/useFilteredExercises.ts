import debounce from 'lodash/debounce';
import React from 'react';

import { Exercise } from '../types';

type Props = {
  exercises: Exercise[];
};

export function useFilteredExercises(props: Props) {
  const { exercises } = props;

  const [filteredExercises, setFilteredExercises] = React.useState<Exercise[]>(
    props.exercises,
  );

  React.useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  const debouceChange = React.useCallback(
    debounce((filterValue: string) => {
      if (filterValue.length === 0) {
        setFilteredExercises(exercises);
      } else {
        const filtered = exercises.filter((exercise) => {
          const { title } = exercise;
          return title
            .toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase());
        });
        setFilteredExercises(filtered);
      }
    }, 500),
    [exercises, setFilteredExercises],
  );

  return {
    debouceChange,
    filteredExercises,
  };
}
