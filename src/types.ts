export type Training = {
  id: string;
  title: string;
  lastOpenedAt: number;

  // relations
  userId: string;
  exercises?: string[];
};

export type Exercise = {
  id: string;
  title: string;
  serie: string;
  recovery: number;
  notes?: string;
  weight: number;

  // relations
  userId: string;
};

export type ExerciseFormState = Pick<
  Exercise,
  'title' | 'serie' | 'recovery' | 'weight' | 'notes'
>;
