import { Router } from "express";
import { ReservationController } from "./reservation.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { checkPermissions } from "../../middleware/checkPermissions"; 

const reservationRoutes = Router();

// Route to create a reservation
reservationRoutes.post(
    "/", 
    AuthMiddleware,
    checkPermissions(['create-reservation']),
    ReservationController.createReservation,
);

// Route to get all reservations
reservationRoutes.get(
    "/", 
    AuthMiddleware,
    checkPermissions(['read-reservations']),
    ReservationController.readReservations,
);

// Route to cancel a reservation
reservationRoutes.delete(
    "/:id", 
    AuthMiddleware,
    checkPermissions(['cancel-reservation']),
    ReservationController.cancelReservation,
);

export default reservationRoutes;
