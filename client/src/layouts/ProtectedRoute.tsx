
import { JSX } from 'react';
import { Navigate } from 'react-router';
import { getToken } from '../helper/localSorageHelper';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!getToken();
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;