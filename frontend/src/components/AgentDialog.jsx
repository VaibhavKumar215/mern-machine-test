import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Icon for close button
import TaskTable from "./TaskTable"; // Component to display tasks in a table
import API from "../services/api"; // Axios instance or API helper

const AgentDialog = ({ agent, onClose, isOpen }) => {
  const [tasks, setTasks] = useState([]); // Stores tasks assigned to the agent
  const [loading, setLoading] = useState(false); // Loading state while fetching tasks

  // Fetch tasks whenever the dialog opens and a valid agent ID is provided
  useEffect(() => {
    if (isOpen && agent?._id) {
      const fetchTasks = async () => {
        if (!agent?._id) return;
        try {
          setLoading(true); // Show loading spinner/message
          const res = await API.get(`/list/${agent._id}`); // Fetch tasks for agent
          setTasks(res.data); // Save tasks in state
        } catch (err) {
          console.error("Error fetching tasks:", err);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchTasks();
    }
  }, [isOpen, agent?._id]);

  // Do not render anything if modal is closed
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay: dark background behind modal */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose} // Clicking outside modal closes it
      ></div>


      {/* Modal Container */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-h-fit">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Tasks for {agent?.name}
        </h2>


        {/* Conditional Rendering */}
        {loading ? (
          // Show loading message while fetching
          <p className="text-gray-500 text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          // Show message if no tasks assigned
          <p className="text-gray-500 text-center">
            No tasks assigned to this agent yet.
          </p>
        ) : (
          // Show tasks in table
          <TaskTable tasks={tasks} />
        )}
      </div>
    </>
  );
};

export default AgentDialog;
