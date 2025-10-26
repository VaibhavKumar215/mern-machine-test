import { useState } from "react";
import API from "../services/api"; // Axios instance
import Sidebar from "../components/AdminSidebar"; // Admin sidebar
import { toast } from "react-toastify";

const AddAgent = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // Validation errors
  const [loading, setLoading] = useState(false); // Loading state for submit


  // Validation Helper
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =============================
  // Handle input change
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers in mobile
    if (name === "mobile" && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  // =============================
  // Handle form submit
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // Add +91 prefix for mobile
      const payload = {
        ...formData,
        mobile: `+91${formData.mobile}`,
      };

      const res = await API.post("/agents", payload); // API call
      toast.success(res.data.message);

      // Reset form
      setFormData({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="Form w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Add Agent
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="FormInput"
              />
              {errors.name && <p className="FormError">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="FormInput"
              />
              {errors.email && <p className="FormError">{errors.email}</p>}
            </div>

            {/* Mobile Field */}
            <div>
              <div className="flex items-center FormInput">
                <span className="text-gray-600 mr-2">+91</span>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter 10-digit number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
              {errors.mobile && <p className="FormError">{errors.mobile}</p>}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="FormInput"
              />
              {errors.password && <p className="FormError">{errors.password}</p>}
            </div>

            {/* Submit Button */}
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
              {loading ? "Adding..." : "Add Agent"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
