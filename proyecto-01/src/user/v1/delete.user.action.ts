import { Request, Response } from "express";
import { UserModel } from "./user.model";

// Action to deactivate a user (soft delete)
export function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    // Find the user by ID and mark them as inactive
    UserModel.findByIdAndUpdate(id, { active: false }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deactivated", user });
        })
        .catch(err => res.status(500).json({ message: "Error deactivating user", error: err.message }));
}
