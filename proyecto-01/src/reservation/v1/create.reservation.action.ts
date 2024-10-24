import { Request, Response } from "express";
import { ReservationModel } from "./reservation.model";
import { BookModel } from "../../book/v1/book.model";
import { UserModel } from "../../user/v1/user.model";

// Action to create a new reservation
export async function createReservation(req: Request, res: Response) {
    try {
        const { bookId, userId } = req.body;

        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book exists and is available
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!book.available) {
            return res.status(400).json({ message: "Book is not available for reservation" });
        }

        // Create the reservation
        const newReservation = new ReservationModel({
            bookId: book._id,
            userId: user._id,
            reservedBy: user.name,
            reservedAt: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // Due in 7 days
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
