export type Training = {
  id: string;
  title: string;
  lastOpenedAt?: number;

  // relations
  userId: string;
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
  trainings?: string[];
};
