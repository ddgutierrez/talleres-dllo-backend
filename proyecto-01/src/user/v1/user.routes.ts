import { Router } from "express";
import { createUser } from "./create.user.action";
import { getUsers } from "./read.user.action";
import { updateUser } from "./update.user.action";
import { deleteUser } from "./delete.user.action";

const userRoutes = Router();

// CREATE USER
userRoutes.post("/", createUser);

// READ USERS
userRoutes.get("/", getUsers);

// UPDATE USER
userRoutes.put("/:id", updateUser);

// DELETE USER (Soft delete)
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
