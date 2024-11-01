import { Request, Response } from "express";
import { createUser } from "./create.user.action";
import { getUsers } from "./read.user.action";
import { updateUser } from "./update.user.action";
import { deleteUser } from "./delete.user.action";
import { loginUser } from "./login.user.action";

// Controller to handle all user-related actions

// Controller function to create a user
export function createUserController(req: Request, res: Response) {
    return createUser(req, res);  // Delegate to the create action
}

// Controller function to read all active users
export function getUsersController(req: Request, res: Response) {
    return getUsers(req, res);  // Delegate to the read action
}

// Controller function to update a user
export function updateUserController(req: Request, res: Response) {
    return updateUser(req, res);  // Delegate to the update action
}

// Controller function to deactivate (soft delete) a user
export function deleteUserController(req: Request, res: Response) {
    return deleteUser(req, res);  // Delegate to the delete action
}

export function loginUserController(req: Request, res: Response) {
    return loginUser(req, res);  // Delegate to the delete action
}
