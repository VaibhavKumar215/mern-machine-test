import { useRef, useState } from "react";
import AgentDialog from "./AgentDialog";

const AgentCard = ({ agent }) => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Agent Card */}
      <div
        className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
        onClick={openDialog}
      >
        <h3 className="text-xl font-bold text-gray-700">{agent.name}</h3>
        <p className="text-gray-500">{agent.email}</p>
        <p className="text-gray-500">Mobile: {agent.mobile}</p>
        <p className="text-green-500 font-semibold mt-2">
          Tasks Assigned: {agent.totalTasks}
        </p>
      </div>

      {/* Dialog */}
      <AgentDialog agent={agent} ref={dialogRef} onClose={closeDialog} isOpen={isOpen} />
    </>
  );
};

export default AgentCard;
