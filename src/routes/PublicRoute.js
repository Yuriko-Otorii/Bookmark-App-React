import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../AuthContext';

const PublicRoute = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PublicRoute;

//https://zenn.dev/rinka/articles/6ed09e0c87838b