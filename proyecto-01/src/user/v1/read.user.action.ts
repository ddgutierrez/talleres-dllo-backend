import { Request, Response } from "express";
import { Database } from "../../server";

// Action to get all active users
export function getUsers(req: Request, res: Response) {
    const users = Database.getUsers();
    const activeUsers = users.filter(user => user.active);
    res.json(activeUsers);
}
