import { Router } from "express";
import { addBlog, deleteBlog, getAllBlogs } from "../controller/blog.controller";


const blogRouter = Router()

blogRouter.get('/getallblog',getAllBlogs)
blogRouter.post('/addblog',addBlog)
blogRouter.delete('/deleteblog/:id',deleteBlog)