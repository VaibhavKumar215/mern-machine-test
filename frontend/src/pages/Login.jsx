import { useState } from "react";
import API from "../services/api"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "agent" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.role) {
      setError("Please fill in all fields, including role.");
      return;
    }

    try { setLoading(true); 
      const res = await API.post("/auth/admin-login", { email: form.email, password: form.password, }); 
      sessionStorage.setItem("token", res.data.token); 
      toast.success("Login successful!"); 
      navigate("/admin-dashboard"); 
    } catch (err){ 
      toast.error(err.response?.data?.message || "Login failed"); 
    } finally { 
      setLoading(false);
    }
  };

  return (
    <div className="FormContainer">
      <form onSubmit={handleSubmit} className="Form">
        <h2 className="FormHeader">Welcome Back</h2>
        <p className="font-medium text-lg text-gray-500 mt-2">
          Please enter your credentials to Login
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-4 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <div className="mt-8 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="FormInput"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="FormInput"
          />
        </div>


        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            disabled={loading}
            className={`FormButton flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            )}
            {loading ? "Admin Logging in..." : "Admin Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
