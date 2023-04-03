import { User } from 'firebase/auth';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const AuthContext = React.createContext<User>({} as User);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      if (pathname !== '/login') {
        // back to login
        navigate('/login', { replace: true });
      }
    } else {
      if (pathname === '/login') {
        // already logged in
        navigate('/', { replace: true });
      }
    }
  }, [pathname, user]);

  return <>{props.children}</>;
}
