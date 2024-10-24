import { Request, Response } from "express";
import { Database } from "../../server";

// Action to get all available books
export function getBooks(req: Request, res: Response) {
    const books = Database.getBooks();
    const availableBooks = books.filter(book => book.available);
    res.json(availableBooks);
}
