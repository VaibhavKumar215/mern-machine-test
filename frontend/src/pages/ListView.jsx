import { useEffect, useState } from "react";
import API from "../services/api"; // Axios instance
import Sidebar from "../components/AdminSidebar"; // Admin sidebar
import AgentCard from "../components/AgentCard"; // Displays individual agent with tasks

const ListView = () => {
  // State for agents and loading
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all agents on mount
  useEffect(() => {
    const fetchAgentsWithTasks = async () => {
      try {
        const res = await API.get("/agents"); // API call to get all agents
        setAgents(res.data); // Save agents to state
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch agents");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    fetchAgentsWithTasks();
  }, []);

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 m-5">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center ml-2">
          Agents & Assigned Tasks
        </h2>

        {/* Agent Cards */}
        <div className="h-[80vh] overflow-auto">
          {loading ? (
            // Loading state
            <p className="text-gray-500 text-center">Loading agents...</p>
          ) : agents.length === 0 ? (
            // No agents found
            <p className="text-red-500 font-semibold text-center">
              No agents found! Please add agents first.
            </p>
          ) : (
            // Grid of Agent Cards
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-4">
              {agents.map((agent) => (
                <AgentCard key={agent._id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListView;
