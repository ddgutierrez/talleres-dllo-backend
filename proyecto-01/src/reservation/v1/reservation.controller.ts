import { createReservation } from "./create.reservation.action";
import { readReservations } from "./read.reservation.action";
import { cancelReservation } from "./cancel.reservation.action";

export const ReservationController = {
    createReservation,
    readReservations,
    cancelReservation
};
