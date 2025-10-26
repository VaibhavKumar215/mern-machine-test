import dotenv from "dotenv";
dotenv.config();

const adminRegisterMiddleware = (req, res, next) => {
  try {
    // Read the secret key from headers
    const clientSecret = req.headers.authorization;

    // Check if header exists
    if (!clientSecret) {
      return res.status(401).json({ message: "Authorization key missing" });
    }

    // Compare with backend secret from .env
    if (clientSecret !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid admin secret key" });
    }

    // If secret matches, allow request to continue
    next();
  } catch (error) {
    console.error("Admin secret validation failed:", error);
    res.status(500).json({ message: "Server error in admin secret validation" });
  }
};

export default adminRegisterMiddleware;
