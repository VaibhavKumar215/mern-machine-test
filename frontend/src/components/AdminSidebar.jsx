import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Upload, List, LogOut, Home, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="relative">
      {/* Hamburger Button (Hidden when sidebar open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-violet-600 text-white p-2 rounded-lg shadow-lg"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between p-6 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        {/* Top Section */}
        <div>
          <h1 className="text-2xl font-bold text-violet-600 mb-10 text-center md:text-left">
            Admin Panel
          </h1>

          <ul className="space-y-2 text-gray-700 font-medium">
            <li className="rounded-lg hover:bg-violet-100 transition">
              <Link
                to="/admin-dashboard"
                className="flex items-center gap-3 px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5" />
                Dashboard
              </Link>
            </li>

            <li className="rounded-lg hover:bg-violet-100 transition">
              <Link
                to="/add-agent"
                className="flex items-center gap-3 px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="w-5 h-5" />
                Add Agent
              </Link>
            </li>

            <li className="rounded-lg hover:bg-violet-100 transition">
              <Link
                to="/upload-csv"
                className="flex items-center gap-3 px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Upload className="w-5 h-5" />
                Upload CSV
              </Link>
            </li>

            <li className="rounded-lg hover:bg-violet-100 transition">
              <Link
                to="/lists"
                className="flex items-center gap-3 px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <List className="w-5 h-5" />
                View Tasks
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
