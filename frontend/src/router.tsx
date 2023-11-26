import { RouteObject } from 'react-router-dom';

import MainLayout from './components/layouts/main/MainLayout';
import HomeView from './views/home/HomeView';

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
];

export default routes;
