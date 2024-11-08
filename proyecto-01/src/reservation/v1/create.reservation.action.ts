import { Request, Response } from "express";
import { ReservationModel } from "./reservation.model";
import { BookModel } from "../../book/v1/book.model";
import { UserModel } from "../../user/v1/user.model";
import mongoose from "mongoose";

// Action to create a new reservation
export async function createReservation(req: Request, res: Response) {
    try {
        const { bookId, userId } = req.body;

        // Validate input data
        if (!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({ message: "A correct Book ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({ message: "A correct User ID is required" });
        }
        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.active) {
            return res.status(400).json({ message: "User is not active" });
        }

        if (userId != req.body.user.id) {
            return res.status(400).json({ message: "User is not verified" });
        }   

        // Check if the book exists and is available
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!book.available) {
            return res.status(400).json({ message: "Book is not available for reservation" });
        }

        if (!book.active) {
            return res.status(400).json({ message: "Book is not active" });
        }

        // Create the reservation
        const newReservation = new ReservationModel({
            bookId: book._id,
            userId: user._id,
            reservedBy: user.name,
            book: book.title,
            reservedAt: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            active: true,
        });

        // Save the reservation and update book availability
        await newReservation.save();
        book.available = false;
        await book.save();

        return res.status(201).json({ message: "Reservation created", reservation: newReservation });

    } catch (error: any) {  // Cast error to 'any' to avoid type issues
        console.error("Error creating reservation:", error);

        // Fallback to a default message if error.message is undefined
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res.status(500).json({ message: "Internal server error", error: errorMessage });
    }
}
