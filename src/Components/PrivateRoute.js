import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ Component, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
