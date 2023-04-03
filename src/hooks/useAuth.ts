import { User } from 'firebase/auth';
import React from 'react';

import { auth } from '../firebase/firebase';

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return {
    user,
  };
}
