import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Login } from './components/auth/Login';
import { Header } from './components/core/Header';
import { CreateExercise } from './components/exercise/CreateExercise';
import { ExerciseList } from './components/exercise/ExerciseList';
import { UpdateExercise } from './components/exercise/UpdateExercise';
import { AddExercise } from './components/training/AddExercise';
import { CreateTraining } from './components/training/CreateTraining';
import { DeleteTraining } from './components/training/DeleteTraining';
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
          <Header />
          <main className="p-5 mt-10">
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
        path: '/training/:id/add-exercise',
        element: <AddExercise />,
      },
      {
        path: '/training/:id/delete',
        element: <DeleteTraining />,
      },
      {
        path: '/exercise',
        element: <ExerciseList />,
      },
      {
        path: '/exercise/create',
        element: <CreateExercise />,
      },
      {
        path: '/exercise/:id',
        element: <UpdateExercise />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
