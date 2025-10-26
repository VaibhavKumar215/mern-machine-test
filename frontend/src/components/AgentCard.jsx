import { useRef, useState } from "react";
import AgentDialog from "./AgentDialog"; // Import dialog component to show agent details

const AgentCard = ({ agent }) => {
  const dialogRef = useRef(null); // Ref to the AgentDialog (if needed for advanced control)
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility

  // Open the dialog
  const openDialog = () => setIsOpen(true);

  // Close the dialog
  const closeDialog = () => setIsOpen(false);

  return (
    <>

      {/* Agent Card */}
      <div
        className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
        onClick={openDialog} // Open dialog when card is clicked
      >
        {/* Agent Name */}
        <h3 className="text-xl font-bold text-gray-700">{agent.name}</h3>

        {/* Agent Email */}
        <p className="text-gray-500">{agent.email}</p>

        {/* Agent Mobile */}
        <p className="text-gray-500">Mobile: {agent.mobile}</p>

        {/* Total Tasks Assigned */}
        <p className="text-green-500 font-semibold mt-2">
          Tasks Assigned: {agent.totalTasks}
        </p>
      </div>


      {/* Agent Dialog */}

      {/* Pass agent data, dialog ref, open state, and close function */}
      <AgentDialog
        agent={agent}
        ref={dialogRef}
        onClose={closeDialog}
        isOpen={isOpen}
      />
    </>
  );
};

export default AgentCard;
