import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to get books by filters or by ID
export async function getBooks(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, genre, publishedDate, available, editorial, active} = req.query;

    try {
        if (id) {
            const book = await BookModel.findById(id);
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }
            return res.json(book);
        }

        // Create a query object based on the provided filters
        const query: any = {};
        if (genre) query.genre = genre;
        if (publishedDate) query.publishedDate = publishedDate;
        if (author) query.author = author;
        if (title) query.title = title;
        if (available) query.available = available;
        if (editorial) query.editorial = editorial;
        if (active !== undefined) query.active = active;

        const books = await BookModel.find(query);
        return res.json(books);
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error fetching books", error: errorMessage });
    }
}
