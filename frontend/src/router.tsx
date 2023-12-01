import { RouteObject } from 'react-router-dom';

import MainLayout from './components/layouts/main/MainLayout';
import HomeView from './views/home/HomeView';
import AuthenticationView from './views/auth/AuthenticationView';

const routes: RouteObject[] = [
  // {
  //   path: '/404',
  //   element: <NotFoundView />,
  // },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthenticationView />,
  }
];

export default routes;
