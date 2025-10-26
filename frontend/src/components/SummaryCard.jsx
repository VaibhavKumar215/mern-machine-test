// SummaryCard Component

// Displays a summary metric in a styled card
// Props:
//   title: string - the label for the metric (e.g., "Total Agents")
//   value: number/string - the metric value
//   color: string - Tailwind text color class for the value
const SummaryCard = ({ title, value, color }) => {
  return (
    <div
      className="bg-white shadow-md rounded-2xl text-center hover:shadow-lg transition
                 w-72 h-40 lg:w-80 lg:h-48 flex flex-col justify-center items-center"
    >
      {/* Title */}
      <h3 className="text-3xl font-semibold text-gray-500 mb-2">{title}</h3>

      {/* Value */}
      <p className={`text-6xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default SummaryCard;
