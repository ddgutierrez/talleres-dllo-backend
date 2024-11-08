import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to create a new book
export async function createBook(req: Request, res: Response) {
    const { title, author, genre, publishedDate, available, editorial, active } = req.body;
    const id = req.body.user.id;

    // Validate required fields
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: "Title is required and must be a string" });
    }
    if (!author || typeof author !== 'string') {
        return res.status(400).json({ message: "Author is required and must be a string" });
    }
    if (!genre || typeof genre !== 'string') {
        return res.status(400).json({ message: "Genre is required and must be a string" });
    }
    if (!publishedDate || isNaN(Date.parse(publishedDate))) {
        return res.status(400).json({ message: "Published date is required and must be a valid date" });
    }
    if (!editorial || typeof editorial !== 'string') {
        return res.status(400).json({ message: "Editorial is required and must be a string" });
    }

    try {
        const newBook = new BookModel({ title, author, genre, publishedDate, available: true, editorial, active: true });
        const savedBook = await newBook.save();
        return res.status(201).json({ message: "Book created successfully", book: savedBook });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error creating book", error: errorMessage });
    }
}
