import { Request, Response } from "express";
import { BookModel, BookType } from "./book.model";

// Action to create a new book
export function createBook(req: Request, res: Response) {
    const { title, author, genre, publishedDate } = req.body as Omit<BookType, '_id'>;
    // Create a new book instance from the request body
    const newBook = new BookModel({
        title,
        author,
        genre,
        publishedDate: new Date(publishedDate),  // Convert to Date object
        available: true,
        reservations: []  // No reservations initially
    });

    // Save the book to MongoDB
    newBook.save()
        .then((book) => res.status(201).json({ message: "Book created", book }))
        .catch(err => res.status(500).json({ message: "Error creating book", error: err.message }));
}
