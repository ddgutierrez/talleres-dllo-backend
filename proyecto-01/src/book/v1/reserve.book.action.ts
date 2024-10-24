import { Request, Response } from "express";
import { Database } from "../../server";

// Action to reserve a book
export function reserveBook(req: Request, res: Response) {
    const books = Database.getBooks();
    const users = Database.getUsers();
    
    const { id } = req.params;  // Book ID
    const { userId } = req.body;  // ID of the user making the reservation

    // Find the book to reserve
    const book = books.find(b => b.id === id);
    
    // Find the user making the reservation
    const user = users.find(u => u.id === userId);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!book.available) {
        return res.status(400).json({ message: "Book is not available for reservation" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Create the reservation
    const reservation = {
        userId: user.id,
        reservedBy: user.name,
        reservedAt: new Date(),  // Current date
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // Due in 7 days
    };

    // Add the reservation to the book and mark it as unavailable
    book.reservations.push(reservation);
    book.available = false;

    res.json({ message: "Book reserved", book });
}
