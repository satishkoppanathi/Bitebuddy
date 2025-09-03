import express from "express"; //used to connect to frontend and backend
import { loginUser,registerUser } from "../controllers/userController.js";

const userRouter = express.Router(); //creating the userRouter
userRouter.post("/register",registerUser)
userRouter.post("/login", loginUser); //userLogin

export default userRouter; //exporting the userRouter to server.js