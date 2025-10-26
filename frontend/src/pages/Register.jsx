import { useState } from "react";
import API from "../services/api"; // Axios instance
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Validation error
  const navigate = useNavigate(); // React Router navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    try {
      // API call to register admin
      const res = await API.post("/auth/register", { email, password });
      
      // Success feedback
      alert(res.data.message);

      // Redirect to login page
      navigate("/");
    } catch (err) {
      // Error feedback
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="FormContainer">
      <form onSubmit={handleSubmit} className="Form">
        {/* Form header */}
        <h2 className="FormHeader mb-2">Admin Registration</h2>

        {/* Validation error */}
        {error && <p className="FormInputError">{error}</p>}

        {/* Input fields */}
        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="FormInput"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="FormInput"
          />
        </div>

        {/* Submit button and redirect link */}
        <div className="mt-8 flex flex-col gap-y-4">
          <button type="submit" className="FormButton">
            Register
          </button>

          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-violet-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
