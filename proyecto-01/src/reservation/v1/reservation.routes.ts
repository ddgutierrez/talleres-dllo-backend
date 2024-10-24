import { Router } from "express";
import { ReservationController } from "./reservation.controller";

const reservationRoutes = Router();

// Route to create a reservation
reservationRoutes.post("/", ReservationController.createReservation);

// Route to get all reservations
reservationRoutes.get("/", ReservationController.readReservations);

// Route to cancel a reservation
reservationRoutes.delete("/:id", ReservationController.cancelReservation);

export default reservationRoutes;
