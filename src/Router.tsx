import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Login } from './auth/components/Login';
import { TrainingList } from './components/training/TrainingList';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </>
    ),
    children: [
      {
        path: '/',
        element: <TrainingList />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
