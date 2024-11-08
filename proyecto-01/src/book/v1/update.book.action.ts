import { Request, Response } from "express";
import { BookModel } from "./book.model";
import mongoose from "mongoose";

// Action to update a book's information
export async function updateBook(req: Request, res: Response) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "A correct Book ID is required" });
    }
    const { title, author, genre, publishedDate, available, editorial } = req.body;

    // Validate the types of the fields if provided
    if (title && typeof title !== 'string') {
        return res.status(400).json({ message: "Invalid title" });
    }
    if (author && typeof author !== 'string') {
        return res.status(400).json({ message: "Invalid author" });
    }
    if (genre && typeof genre !== 'string') {
        return res.status(400).json({ message: "Invalid genre" });
    }
    if (publishedDate && isNaN(Date.parse(publishedDate))) {
        return res.status(400).json({ message: "Invalid published date" });
    }
    if (available !== undefined && typeof available !== 'boolean') {
        return res.status(400).json({ message: "Invalid availability status" });
    }
    if (editorial && typeof editorial !== 'string') {
        return res.status(400).json({ message: "Invalid editorial" });
    }

    try {
        const book = await BookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Update fields if provided
        if (title) book.title = title;
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (publishedDate) book.publishedDate = publishedDate;
        if (available) book.available = available;
        if (editorial) book.editorial = editorial;

        const updatedBook = await book.save();
        return res.json({ message: "Book updated successfully", book: updatedBook });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error updating book", error: errorMessage });
    }
}
