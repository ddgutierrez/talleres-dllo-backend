import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to deactivate a book (soft delete)
export function deleteBook(req: Request, res: Response) {
    const { id } = req.params;

    // Find the book by ID and mark it as unavailable
    BookModel.findByIdAndUpdate(id, { available: false }, { new: true })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.json({ message: "Book deactivated", book });
        })
        .catch(err => res.status(500).json({ message: "Error deleting book", error: err.message }));
}
