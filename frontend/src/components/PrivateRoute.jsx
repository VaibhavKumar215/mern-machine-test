import { Navigate } from "react-router-dom";


// PrivateRoute Component

// Protects routes by checking if the user is authenticated
// If a valid token exists in sessionStorage, renders the child component
// Otherwise, redirects to the login page
const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Retrieve JWT token from session storage

  if (!token) {
    // If token does not exist, user is not logged in
    // Redirect to the login page ("/")
    return <Navigate to="/" replace />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default PrivateRoute;
