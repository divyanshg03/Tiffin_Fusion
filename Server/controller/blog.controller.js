import jwt from "jsonwebtoken";
import { Blog } from "../models/blog.model.js";

// Function to authenticate user
const authenticateUser = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return { error: "No token provided", status: 401 };
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return { error: "Invalid token format", status: 401 };
    }

    try {
        const decoded = jwt.verify(token, "THIS_IS_A_JWT_SECRET");
        return { u_id: decoded.id };
    } catch (err) {
        console.error("Invalid token:", err);
        return { error: "Invalid token", status: 401 };
    }
};

// Controller to add a blog
const addBlog = async (req, res) => {
    try {
        const { name, content } = req.body;

        // Authenticate user
        const authResult = authenticateUser(req, res);
        if (authResult.error) {
            return res.status(authResult.status).json({ error: authResult.error });
        }

        // Validate inputs
        if (!name || !content) {
            return res.status(400).json({ error: "Blog title and content are required." });
        }

        const createdBlog = new Blog({
            title: name,
            content: content,
            author: authResult.u_id, 
        });

        await createdBlog.save();
        console.log("Blog created successfully");

        return res.status(201).json({
            message: "Blog created successfully",
            blog: createdBlog,
        });
    } catch (error) {
        console.error("Error in addBlog:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Controller to delete a blog
const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Authenticate user
        const authResult = authenticateUser(req, res);
        if (authResult.error) {
            return res.status(authResult.status).json({ error: authResult.error });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Check if the user is the author of the blog
        if (blog.author.toString() !== authResult.u_id) {
            return res.status(403).json({ error: "Unauthorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(blogId);
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Controller to get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "username email"); 
        return res.status(200).json({
            message: "All blogs retrieved successfully",
            blogs,
        });
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};



export { addBlog, deleteBlog, getAllBlogs}
