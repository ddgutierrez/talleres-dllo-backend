import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to create a new book
export async function createBook(req: Request, res: Response) {
    const { title, author, genre, publishedDate } = req.body;

    try {
        const newBook = new BookModel({ title, author, genre, publishedDate, available: true });
        const savedBook = await newBook.save();
        return res.status(201).json({ message: "Book created successfully", book: savedBook });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error creating book", error: errorMessage });
    }
}
