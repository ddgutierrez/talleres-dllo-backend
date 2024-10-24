import { Request, Response } from "express";
import { Database } from "../../server";
import { Book, BookType } from "./book.model";

// Action to create a new book
export function createBook(req: Request, res: Response) {
    const { title, author, genre, publishedDate } = req.body;

    const newBook: BookType = {
        id: String(Database.getBooks().length + 1),  // Generate simple ID
        title,
        author,
        genre,
        publishedDate: new Date(publishedDate),
        available: true,
        reservations: []
    };

    const book = new Book(newBook);
    Database.addBook(book);

    res.status(201).json({ message: "Book created", book });
}
