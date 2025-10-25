const TaskTable = ({ tasks }) => {
  return (
    <div className="overflow-auto max-h-[80vh] rounded-md border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-300  sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2  max-w-10">S.no</th>
            <th className="px-4 py-2 ">First Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2 min-w-40">Notes</th>
            <th className="px-4 py-2">Assigned At</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-600">
                No tasks assigned
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task._id} className="hover:bg-gray-50 text-center">
                <td className="px-3 py-3 text-gray-700 font-medium text-center">
                  {index + 1}.
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {task.firstName}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {task.phone}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {task.notes}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(task.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
