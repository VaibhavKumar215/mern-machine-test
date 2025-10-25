import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
