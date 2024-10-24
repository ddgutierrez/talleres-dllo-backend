import { Request, Response } from "express";
import { Database } from "../../server";

// Action to deactivate a user (soft delete)
export function deleteUser(req: Request, res: Response) {
    const users = Database.getUsers();
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (user && user.active) {
        user.deactivate();  // Soft delete (mark as inactive)
        res.json({ message: "User deactivated", user });
    } else {
        res.status(404).json({ message: "User not found or already inactive" });
    }
}
