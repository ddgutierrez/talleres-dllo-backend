import { Request, Response } from "express";
import { BookModel } from "./book.model";
import mongoose from "mongoose";

// Action to deactivate a book (soft delete)
export async function deleteBook(req: Request, res: Response) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "A correct Book ID is required" });
    }

    try {
        const book = await BookModel.findByIdAndUpdate(id, { active: false }, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!book.active) {
            return res.status(400).json({ message: "Book is already deactivated" });
        }
        return res.json({ message: "Book deactivated", book });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error deactivating book", error: errorMessage });
    }
}
