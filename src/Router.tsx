import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Login } from './components/auth/Login';
import { CreateExercise } from './components/exercise/CreateExercise';
import { ExerciseList } from './components/exercise/ExerciseList';
import { CreateTraining } from './components/training/CreateTraining';
import { TrainingList } from './components/training/TrainingList';
import { ViewTraining } from './components/training/ViewTraining';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthProvider>
        <Login />,
      </AuthProvider>
    ),
  },
  {
    path: '/',
    element: (
      <>
        <AuthProvider>
          <main className="p-5">
            <Outlet />
          </main>
        </AuthProvider>
      </>
    ),
    children: [
      {
        path: '/',
        element: <TrainingList />,
      },
      {
        path: '/training/create',
        element: <CreateTraining />,
      },
      {
        path: '/training/:id',
        element: <ViewTraining />,
      },
      {
        path: '/exercise',
        element: <ExerciseList />,
      },
      {
        path: '/exercise/create',
        element: <CreateExercise />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
