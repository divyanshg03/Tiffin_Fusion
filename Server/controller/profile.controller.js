import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getProfile = async (req, res) => {
    console.log("getprofile called")
  try {
    // Check if authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ error: "Authorization header is missing" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Token is missing" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "THSI_IS_A_JWT_SECRET");
    
    // Fetch the user details based on the decoded user ID
    const fetchedUser = await User.findById(decoded.id);
    
    // Handle case where user is not found
    if (!fetchedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the fetched user data in the response
    return res.status(200).json({ success: true, user: fetchedUser });

  } catch (error) {
    // Handle JWT verification errors or other exceptions
    console.error(error);
    return res.status(500).json({ error: "Server error, please try again later" });
  }
};
