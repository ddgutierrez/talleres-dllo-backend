import { Request, Response } from "express";
import { BookModel, BookType } from "./book.model";

// Action to update a book's information
export async function updateBook(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, genre, publishedDate, available } = req.body as Partial<Omit<BookType, '_id'>>;

    try {
        // Validate the publishedDate if it's provided
        let validPublishedDate;
        if (publishedDate) {
            const parsedDate = new Date(publishedDate);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format for publishedDate" });
            }
            validPublishedDate = parsedDate;
        }

        // Update only the fields that are provided
        const updatedBook = await BookModel.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(author && { author }),
                ...(genre && { genre }),
                ...(validPublishedDate && { publishedDate: validPublishedDate }),
                ...(available !== undefined && { available })
            },
            { new: true, runValidators: true }  // Return the updated document and ensure validation
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ message: "Book updated", book: updatedBook });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error updating book", error: errorMessage });
    }
}
