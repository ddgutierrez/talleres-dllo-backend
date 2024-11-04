import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Action to deactivate a book (soft delete)
export async function deleteBook(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const book = await BookModel.findByIdAndUpdate(id, { available: false }, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ message: "Book deactivated", book });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error deactivating book", error: errorMessage });
    }
}
