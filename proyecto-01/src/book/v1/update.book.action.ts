import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to update a book's information
export async function updateBook(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, genre, publishedDate, available, editorial } = req.body;

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
