import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddAgent from "./pages/AddAgent";
import UploadCSV from "./pages/UploadCSV";
import ListView from "./pages/ListView";
import PrivateRoute from "./components/PrivateRoute"; // Protects authenticated routes
import { ToastContainer } from 'react-toastify'; // For notifications

function App() {
  return (
    <Router>
      {/* Define all application routes */}
      <Routes>
        {/* Public route: Login */}
        <Route path="/" element={<Login />} />

        {/* Optional registration route (currently commented out) */}
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Private/Admin-only routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/add-agent" 
          element={
            <PrivateRoute>
              <AddAgent />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/upload-csv" 
          element={
            <PrivateRoute>
              <UploadCSV />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/lists" 
          element={
            <PrivateRoute>
              <ListView />
            </PrivateRoute>
          } 
        />
      </Routes>

      {/* Toast notifications container */}
      <ToastContainer />
    </Router>
  );
}

export default App;
