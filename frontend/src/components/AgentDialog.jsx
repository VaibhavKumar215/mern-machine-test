import { useState,useEffect } from "react";
import { X } from "lucide-react";
import TaskTable from "./TaskTable";
import API from "../services/api";

const AgentDialog = ({ agent, onClose, isOpen }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && agent?._id) {
      const fetchTasks = async () => {
      if (!agent?._id) return;
      try {
        setLoading(true);
        const res = await API.get(`/list/${agent._id}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks()
    }
  }, [isOpen]);

  if (!isOpen) return null; 

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg  max-h-fit">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Tasks for {agent?.name}
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tasks assigned to this agent yet.
          </p>
        ) : (
          <TaskTable tasks={tasks} />
        )}
      </div>
    </>
  );
};

export default AgentDialog;
