import { Request, Response } from "express";
import { Database } from "../../server";
import { BookType } from "./book.model";

// Action to update a book
export function updateBook(req: Request, res: Response) {
    const books = Database.getBooks();
    const { id } = req.params;
    const book = books.find(b => b.id === id);

    if (book) {
        const { title, author, genre, publishedDate } = req.body as BookType;
        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        book.publishedDate = new Date(publishedDate) || book.publishedDate;
        res.json({ message: "Book updated", book });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
}
