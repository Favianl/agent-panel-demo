import { RouterProvider, createHashRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Account from './Account';
import Transactions from './Transactions';
import Settings from './Settings';
import NotFound from './NotFound';

const AppRouter = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Landing />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'transactions',
          element: <Transactions />,
        },
        {
          path: 'account',
          element: <Account />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
