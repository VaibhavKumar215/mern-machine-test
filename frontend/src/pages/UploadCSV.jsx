import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) return toast.error("Please select a file");

  const formData = new FormData();
  formData.append("file", file);

  setLoading(true);

  try {
    const res = await API.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response?.data?.message || "Upload failed");
  } finally {
    setLoading(false);
    e.target.reset();
    setFile(null);
  }
};



  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload File</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label htmlFor="file" className="block text-gray-700 font-medium mb-1">
              Select CSV / XLSX / AXLS File
            </label>
            <input
              id="file"
              type="file"
              accept=".csv,.xlsx,.axls"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="FormInput"
            />

            <button
              type="submit"
              className={`FormButton flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading && (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              {loading ? "Uploading..." : "Upload"}
            </button>

          </form>

          {file && !loading && (
            <p className="mt-4 text-green-600 font-medium text-center">
              Selected file: {file.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCSV;
