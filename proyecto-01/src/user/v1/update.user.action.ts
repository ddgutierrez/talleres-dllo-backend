import { Request, Response } from "express";
import { Database } from "../../server";
import { UpdateUserType } from "./user.types";

// Action to update user information
export function updateUser(req: Request, res: Response) {
    const users = Database.getUsers();
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (user && user.active) {
        const { name, email, role } = req.body as UpdateUserType;
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        res.json({ message: "User updated", user });
    } else {
        res.status(404).json({ message: "User not found or inactive" });
    }
}
