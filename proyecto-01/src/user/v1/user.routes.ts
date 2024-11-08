import { Router } from "express";
import { createUserController, getUsersController, updateUserController, deleteUserController, loginUserController } from "./user.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { checkPermissions } from "../../middleware/checkPermissions";  // Importa el middleware de permisos

const userRoutes = Router();

// CREATE USER (Registro público)
userRoutes.post("/create", createUserController);

// LOGIN (Público)
userRoutes.post("/login", loginUserController);

// READ USERS
userRoutes.get("/:id?",  getUsersController);

// UPDATE USER (Verifica que sea el propio usuario o que tenga permisos de actualización)
userRoutes.put(
    "/update/:id",
    AuthMiddleware,
    checkPermissions(['update-user']),
    updateUserController
);

// DELETE USER (Verifica que sea el propio usuario o que tenga permisos de eliminación)
userRoutes.delete(
    "/delete/:id",
    AuthMiddleware,
    checkPermissions(['delete-user']),
    deleteUserController
);

export default userRoutes;
