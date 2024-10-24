import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to get all available books
export function getBooks(req: Request, res: Response) {
    // Find all books where 'available' is true
    BookModel.find({ available: true })
        .then((books) => res.json(books))
        .catch(err => res.status(500).json({ message: "Error fetching books", error: err.message }));
}
