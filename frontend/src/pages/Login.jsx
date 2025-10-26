import { useState } from "react";
import API from "../services/api"; // Axios instance
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // Form state for email, password, and role
  const [form, setForm] = useState({ email: "", password: "", role: "agent" });
  const [error, setError] = useState(""); // Error message for validation
  const [loading, setLoading] = useState(false); // Loading spinner state
  const navigate = useNavigate(); // React Router navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.email || !form.password || !form.role) {
      setError("Please fill in all fields, including role.");
      return;
    }

    try {
      setLoading(true);

      // API call to admin login endpoint
      const res = await API.post("/auth/admin-login", {
        email: form.email,
        password: form.password,
      });

      // Save JWT token in session storage
      sessionStorage.setItem("token", res.data.token);

      toast.success("Login successful!");
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FormContainer">
      <form onSubmit={handleSubmit} className="Form">
        {/* Form header */}
        <h2 className="FormHeader">Welcome Back</h2>
        <p className="font-medium text-lg text-gray-500 mt-2">
          Please enter your credentials to Login
        </p>

        {/* Validation / error message */}
        {error && (
          <p className="text-red-500 text-sm mt-4 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        {/* Input fields */}
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

        {/* Submit button */}
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
