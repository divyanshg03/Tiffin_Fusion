import { getProfile } from "../controller/profile.controller.js";
import express from "express"


const profileRouter = express.Router()

//profile route
profileRouter.get('/getprofile',getProfile)



export {profileRouter}