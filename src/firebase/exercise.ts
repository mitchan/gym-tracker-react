import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { Exercise } from '../types';
import { db } from './firebase';
import { auth } from './firebase';

const path = 'exercises';

export async function getExercises(trainingId?: string) {
  if (!auth.currentUser) {
    return [];
  }

  const coll = collection(db, path);
  const q = query(
    coll,
    where('userId', '==', auth.currentUser.uid),
    ...(trainingId ? [where('trainings', 'in', [trainingId])] : []),
    // orderBy('title', 'asc'),
  );
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((doc) => doc.data() as Exercise);
  return list;
}

export function createTraining(title: string) {
  if (!auth.currentUser) {
    throw new Error('Cannot create a training if the user is not logged in');
  }

  // check if a traing
  const id = uuidv4();

  return setDoc(doc(db, path, id), {
    id,
    title,
    userId: auth.currentUser.uid,
  });
}
