import { Router } from "express";
import { createBookController, getBooksController, updateBookController, deleteBookController, } from "./book.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { checkPermissions } from "../../middleware/checkPermissions";  // Importa el middleware de permisos

const bookRoutes = Router();

// Public endpoint
bookRoutes.get("/:id?", getBooksController);

// Protected endpoints
bookRoutes.post(
    "/create", 
    AuthMiddleware, 
    checkPermissions(['create-book']),
    createBookController
);

bookRoutes.put(
    "/update/:id",
    AuthMiddleware, 
    checkPermissions(['update-book']),
    updateBookController
);

bookRoutes.delete(
    "/delete/:id", 
    AuthMiddleware, 
    checkPermissions(['delete-book']),
    deleteBookController
);

export default bookRoutes;
