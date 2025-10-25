import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddAgent from "./pages/AddAgent";
import UploadCSV from "./pages/UploadCSV";
import ListView from "./pages/ListView";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />  */}
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
      <ToastContainer />
    </Router>
  );
}

export default App;
