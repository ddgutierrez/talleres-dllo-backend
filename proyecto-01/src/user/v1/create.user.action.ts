import { Request, Response } from "express";
import { Database } from "../../server";
import { User, UserType } from "./user.model";
import { CreateUserType } from "./user.types";

// Action to create a new user
export function createUser(req: Request, res: Response) {
    const { name, email, password, role = "user" } = req.body as CreateUserType;

    const newUser: UserType = {
        id: String(Database.getUsers().length + 1),  // Generate simple ID
        name,
        email,
        password,
        role,
        active: true
    };

    const user = new User(newUser);
    Database.addUser(user);

    res.status(201).json({ message: "User created", user });
}
