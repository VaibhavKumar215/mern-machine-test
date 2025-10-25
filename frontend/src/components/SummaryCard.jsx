const SummaryCard = ({ title, value, color }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl text-center hover:shadow-lg transition w-72 h-40 lg:w-80 lg:h-48 flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold text-gray-500 mb-2">{title}</h3>
      <p className={`text-6xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default SummaryCard;