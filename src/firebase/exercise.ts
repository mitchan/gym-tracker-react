import {
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
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

export async function getExerciseById(
  id: string,
): Promise<Exercise | undefined> {
  if (!auth.currentUser) {
    throw new Error('Cannot get a training if the user is not logged in');
  }

  const q = query(
    exerciseCol,
    where('userId', '==', auth.currentUser.uid),
    where('id', '==', id),
  );
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((doc) => doc.data() as Exercise);
  return list[0];
}

export function createExercise(state: ExerciseFormState): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('Cannot create an exercise if the user is not logged in');
  }

  const id = uuidv4();
  const exerciseRef = doc(exerciseCol, id);

  return setDoc<Exercise, DocumentData>(exerciseRef, {
    id,
    title: state.title,
    recovery: state.recovery,
    serie: state.serie,
    weight: state.weight,
    notes: state.notes,
    userId: auth.currentUser.uid,
    count: 0,
    done: false,
  });
}

export function updateExercise(
  id: string,
  data: Partial<Exercise>,
): Promise<void> {
  const exerciseRef = doc(exerciseCol, id);
  return updateDoc<Exercise, DocumentData>(exerciseRef, data);
}
