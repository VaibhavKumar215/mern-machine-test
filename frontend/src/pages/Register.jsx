import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both email and password fields.");
            return;
        }

        try {
            const res = await API.post("/auth/register", { email, password });
            alert(res.data.message);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="FormContainer">
            <form
                onSubmit={handleSubmit}
                className="Form"
            >
                <h2 className="FormHeader mb-2">Admin Registration</h2>

                 {error && (
                    <p className="FormInputError">
                        {error}
                    </p>
                )}

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

                <div className="mt-8 flex flex-col gap-y-4">
                    <button
                        type="submit"
                        className="FormButton"
                    >
                        Register
                    </button>

                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/" className="text-violet-500 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default Register;
