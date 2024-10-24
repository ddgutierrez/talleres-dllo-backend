import { Router } from "express";
import { createBookController, getBooksController, updateBookController, deleteBookController, } from "./book.controller";

const bookRoutes = Router();

// CREATE BOOK
bookRoutes.post("/", createBookController);

// READ BOOKS
bookRoutes.get("/", getBooksController);


// UPDATE BOOK
bookRoutes.put("/:id", updateBookController);

// DELETE BOOK (Soft delete)
bookRoutes.delete("/:id", deleteBookController);

export default bookRoutes;
