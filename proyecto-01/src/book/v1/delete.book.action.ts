import { Request, Response } from "express";
import { Database } from "../../server";

// Action to deactivate a book (soft delete)
export function deleteBook(req: Request, res: Response) {
    const books = Database.getBooks();
    const { id } = req.params;
    const book = books.find(b => b.id === id);

    if (book && book.available) {
        book.available = false;  // Mark the book as unavailable
        res.json({ message: "Book deactivated", book });
    } else {
        res.status(404).json({ message: "Book not found or already unavailable" });
    }
}
