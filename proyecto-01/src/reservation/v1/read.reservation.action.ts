import { Request, Response } from "express";
import { ReservationModel } from "./reservation.model";

// Action to get all reservations
export async function readReservations(req: Request, res: Response) {
    try {
        const reservations = await ReservationModel.find();
        return res.json({ reservations });
    } catch (error: any) {
        console.error("Error reading reservations:", error);

        // Fallback to a default message if error.message is undefined
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res.status(500).json({ message: "Internal server error", error: errorMessage });
    }
}
