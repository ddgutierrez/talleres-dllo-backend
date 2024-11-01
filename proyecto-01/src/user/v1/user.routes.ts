import { Router } from "express";
import { createUserController, getUsersController, updateUserController, deleteUserController, loginUserController, } from "./user.controller";
import { AuthMiddleware } from "../../middleware/auth";

const userRoutes = Router();

// CREATE USER
userRoutes.post("/create", createUserController);
userRoutes.post("/login", loginUserController);

// READ USERS
userRoutes.get("/", getUsersController);

userRoutes.put("/update/:id", AuthMiddleware, updateUserController);
userRoutes.delete("/delete/:id", AuthMiddleware, deleteUserController);

export default userRoutes;
