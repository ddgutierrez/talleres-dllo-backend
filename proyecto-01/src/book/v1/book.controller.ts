import { Request, Response } from "express";
import { createBook } from "./create.book.action";
import { getBooks } from "./read.book.action";
import { updateBook } from "./update.book.action";
import { deleteBook } from "./delete.book.action";

// Controller to handle all book-related actions

// Controller function to create a book
export function createBookController(req: Request, res: Response) {
    return createBook(req, res);  // Delegate to the create action
}

// Controller function to read all available books
export function getBooksController(req: Request, res: Response) {
    return getBooks(req, res);  // Delegate to the read action
}

// Controller function to update a book
export function updateBookController(req: Request, res: Response) {
    return updateBook(req, res);  // Delegate to the update action
}

// Controller function to deactivate (soft delete) a book
export function deleteBookController(req: Request, res: Response) {
    return deleteBook(req, res);  // Delegate to the delete action
}

