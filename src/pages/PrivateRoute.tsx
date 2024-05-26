import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/ui/Loader';

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  children?: React.ReactNode;
  navigateTo?: string;
}

const PrivateRoute = ({
  isAuth,
  isLoading,
  children,
  navigateTo = '/login',
}: Props) => {
  if (isLoading && !isAuth) return <Loader />;

  if (!isAuth) return <Navigate to={navigateTo} />;

  return children ? children : <Outlet />;
};

export default PrivateRoute;
