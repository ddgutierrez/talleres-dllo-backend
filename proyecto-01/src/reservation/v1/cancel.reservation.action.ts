import { Request, Response } from "express";
import { ReservationModel } from "./reservation.model";
import { BookModel } from "../../book/v1/book.model";

// Action to cancel a reservation
export async function cancelReservation(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Reservation ID is required" });
        }

        const userid = req.body.user.id;

        if (!userid) {
            return res.status(400).json({ message: "Error fetching User ID" });
        }
        
        // Find the reservation
        const reservation = await ReservationModel.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        if (!reservation.active) {
            return res.status(400).json({ message: "Reservation is already canceled" });
        }

        if(userid != reservation.userId){
            return res.status(403).json({ message: "You are not authorized to cancel this reservation" });
        }

        // Mark the book as available
        const book = await BookModel.findById(reservation.bookId);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        } else {
            book.available = true;
            await book.save();
        }

        // Delete the reservation
        await ReservationModel.findByIdAndUpdate(id, { active: false }, { new: true });;

        return res.json({ message: "Reservation canceled" });

    } catch (error: any) {
        console.error("Error canceling reservation:", error);

        // Fallback to a default message if error.message is undefined
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res.status(500).json({ message: "Internal server error", error: errorMessage });
    }
}
