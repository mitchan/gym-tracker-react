import {
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { Exercise, ExerciseFormState } from '../types';
import { exerciseCol } from './firebase';
import { auth } from './firebase';

export async function getExercises(trainingId?: string, addExercise = false) {
  if (!auth.currentUser) {
    return [];
  }

  const q = query(
    exerciseCol,
    where('userId', '==', auth.currentUser.uid),
    ...(trainingId && !addExercise
      ? [where('trainings', 'array-contains', trainingId)]
      : []),
    orderBy('title', 'asc'),
  );

  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
}

export function createExercise(state: ExerciseFormState): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('Cannot create an exercise if the user is not logged in');
  }

  const id = uuidv4();
  const exerciseRef = doc(exerciseCol, id);

  return setDoc<Exercise>(exerciseRef, {
    id,
    title: state.title,
    recovery: state.recovery,
    serie: state.serie,
    weight: state.weight,
    notes: state.notes,
    userId: auth.currentUser.uid,
  });
}
