import { Request, Response } from "express";
import { UserModel, UserType } from "./user.model";

// Action to update a user's information
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, role } = req.body as Partial<Omit<UserType, '_id'>>;

    if (!name && !email && !role) {
        return res.status(400).json({ message: "No fields provided for update" });
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;

        // Save the updated document
        const updatedUser = await user.save();
        return res.json({ message: "User updated", user: updatedUser });
    } catch (err: any) {
        // Safely handle the error message
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error updating user", error: errorMessage });
    }
}
