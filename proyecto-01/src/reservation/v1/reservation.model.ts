import { Schema, model } from "mongoose";

// Define the TypeScript type for the Reservation model
export type ReservationType = {
    _id?: string;
    bookId: string;
    userId: string;
    reservedBy: string;
    book: string;
    reservedAt: Date;
    dueDate: Date;
    returnedAt: Date;
    active: boolean;
};

// Define the Reservation schema
const ReservationSchema = new Schema<ReservationType>({
    bookId: {
        type: String,
        required: true,
        ref: 'Book'  // Reference to the Book model
    },
    userId: {
        type: String,
        required: true,
        ref: 'User'  // Reference to the User model
    },
    reservedBy: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    reservedAt: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnedAt: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt
    versionKey: false  // Disable the __v versioning field
});

// Create and export the Reservation model
export const ReservationModel = model<ReservationType>("Reservation", ReservationSchema);
