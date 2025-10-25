import { useEffect, useState } from "react";
import Sidebar from "../components/AdminSidebar";
import SummaryCard from "../components/SummaryCard";
import API from "../services/api";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalAgents: 0,
    totalTasks: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("/dashboard/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="flex h-screen bg-amber-50 justify-center">
      <Sidebar />

      <div className="flex-1 m-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 ml-5 lg:ml-0">Welcome, back 👋</h2>
        <p className="text-lg text-gray-600 mb-8">
          Manage agents, upload leads, and track distributions all in one place.
        </p>

        <div className="flex flex-wrap justify-center lg:justify-around gap-10 mt-10">
          <SummaryCard
            title="Total Agents"
            value={`${summary.totalAgents}`}
            color="text-violet-600"
          />
          <SummaryCard
            title="Total Tasks"
            value={`${summary.totalTasks}`}
            color="text-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
