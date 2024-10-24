import { Request, Response } from "express";
import { UserModel } from "./user.model";

// Action to get all active users
export function getUsers(req: Request, res: Response) {
    // Find all users where 'active' is true
    UserModel.find({ active: true })
        .then((users) => res.json(users))
        .catch(err => res.status(500).json({ message: "Error fetching users", error: err.message }));
}
