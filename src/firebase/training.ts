import {
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { Training } from '../types';
import { trainingCol } from './firebase';
import { auth } from './firebase';

export async function getTrainings() {
  if (!auth.currentUser) {
    return [];
  }

  const q = query(
    trainingCol,
    where('userId', '==', auth.currentUser.uid),
    orderBy('lastOpenedAt', 'desc'),
  );
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((doc) => doc.data() as Training);
  return list;
}

export function createTraining(title: string) {
  if (!auth.currentUser) {
    throw new Error('Cannot create a training if the user is not logged in');
  }

  const id = uuidv4();
  const trainingRef = doc(trainingCol, id);

  return setDoc(trainingRef, {
    id,
    title,
    userId: auth.currentUser.uid,
    lastOpenedAt: Date.now(),
  });
}
