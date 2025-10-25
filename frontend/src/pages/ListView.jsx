import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/AdminSidebar";
import AgentCard from "../components/AgentCard";

const ListView = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentsWithTasks = async () => {
      try {
        const res = await API.get("/agents");
        setAgents(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch agents");
      } finally {
        setLoading(false);
      }
    };
    fetchAgentsWithTasks();
  }, []);

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar />

      <div className="flex-1 m-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center ml-2">Agents & Assigned Tasks</h2>

        <div className="h-[80vh] overflow-auto">
            {loading ? (
          <p className="text-gray-500">Loading agents...</p>
        ) : agents.length === 0 ? (
          <p className="text-red-500 font-semibold">
            No agents found! Please add agents first.
          </p>
        ) : (
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
