import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const checkAdmin = async (req, res, next) => {
  try {
    // Extract token from headers
    // const {email, password} = req.body 

    
    const header = req.headers.authorization
    const token = header.split(" ")[1]
    if (!token) {
      return res.status(400).json({ error: "Token is missing" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "THSI_IS_A_JWT_SECRET");

    // Fetch the user details based on the decoded user ID
    const fetchedUser = await User.findById(decoded.id);

    if (!fetchedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if user is admin
    if (!fetchedUser.isAdmin) {
      return res.status(403).send({ message: 'Access denied, admin privileges required' });
    }

    req.adminUser = fetchedUser 
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Admin check failed:', error);
    res.status(500).send({ message: 'Server error' });
  }
};
