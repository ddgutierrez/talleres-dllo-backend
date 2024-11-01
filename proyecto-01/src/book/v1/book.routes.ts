import { Router } from "express";
import { createBookController, getBooksController, updateBookController, deleteBookController, } from "./book.controller";
import { AuthMiddleware } from "../../middleware/auth";
const bookRoutes = Router();

// Public endpoint
bookRoutes.get("/:id?", getBooksController);

// Protected endpoints
bookRoutes.post("/create", AuthMiddleware, createBookController);
bookRoutes.put("/update/:id", AuthMiddleware, updateBookController);
bookRoutes.delete("/delete/:id", AuthMiddleware, deleteBookController);

export default bookRoutes;
