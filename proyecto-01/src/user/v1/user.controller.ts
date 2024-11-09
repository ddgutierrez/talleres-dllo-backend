import { Request, Response } from "express";
import { createUser } from "./create.user.action";
import { getUsers } from "./read.user.action";
import { updateUser } from "./update.user.action";
import { deleteUser } from "./delete.user.action";
import { loginUser } from "./login.user.action";
import { UserModel, UserType } from "./user.model";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Controller to handle all user-related actions

// Controller function to create a user
export async function createUserController(req: Request, res: Response) {
    const { name, email, password, permissions } = req.body as Omit<UserType, '_id'>;

    // Validate required fields
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: "Name is required and must be a string" });
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required and must be a string" });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: "Password is required and must be a string" });
    }
    if (!Array.isArray(permissions) || !permissions.every(p => typeof p === 'string')) {
        return res.status(400).json({ message: "Permissions must be an array of strings" });
    }
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user data
        const userData: Partial<UserType> = {
            name,
            email,
            password: hashedPassword,
            permissions,
            active: true
        };

        // Create user
        const user = await createUser(userData);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        if ((error as any).code === 11000) {
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ message: "Error creating user", error });
        }
    }
}

// Controller function to read all active users
export async function getUsersController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { includeDisabled, ...filters } = req.query;

        // Fetch users
        const users = await getUsers(filters, id, includeDisabled === 'true');
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error: any) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
}

// Controller function to update a user
export async function updateUserController(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, permissions } = req.body as Partial<Omit<UserType, '_id'>>;

    // Authenticated user from middleware
    const authenticatedUser = req.body.user;

    if (!authenticatedUser) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    // Verify if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    // Verify if the authenticated user is the same as the one to be updated or has permissions to update users
    if (authenticatedUser.id !== id && !authenticatedUser.permissions.includes('update-user')) {
        return res.status(403).json({ message: "You don't have permission to update users" });
    }

    // Verify if fields are provided for the update
    if (!name && !email && !permissions) {
        return res.status(400).json({ message: "Provide fields to update" });
    }

    try {
        // Prepare update data
        const updateData: Partial<Omit<UserType, '_id'>> = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (permissions && authenticatedUser.permissions.includes('update-permissions')) {
            updateData.permissions = permissions;  // Only users with permission can update permissions
        }

        // Update user
        const updatedUser = await updateUser(id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        return res.status(500).json({ message: "Error updating user", error: errorMessage });
    }
}

// Controller function to deactivate (soft delete) a user
export async function deleteUserController(req: Request, res: Response) {
    const { id } = req.params;

    // Authenticated user from middleware
    const authenticatedUser = req.body.user;

    if (!authenticatedUser) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    // Verify if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    // Verify if the authenticated user is the same as the one to be deactivated or has permissions to deactivate users
    if (authenticatedUser.id !== id && !authenticatedUser.permissions.includes('delete-user')) {
        return res.status(403).json({ message: "You don't have permission to delete users" });
    }

    // Find the user by ID
    const user = await UserModel.findById(id).select('-password');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Verify if the user is already deactivated
    if (!user.active) {
        return res.status(400).json({ message: "User is already deactivated" });
    }

    try {
        // Deactivate user
        const updatedUser = await deleteUser(id);
        res.json({ message: "User deactivated", user: updatedUser });
    } catch (error: any) {
        res.status(500).json({ message: "Error deactivating user", error: error.message });
    }
}

// Controller function to log in a user
export async function loginUserController(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required and must be a string" });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: "Password is required and must be a string" });
    }

    try {
        // Authenticate user and generate token
        const result = await loginUser(email, password);
        if (result) {
            const { token, user } = result;
            return res.json({ message: "Successful login", token, user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        return res.status(500).json({ message: "Error during login", error: errorMessage });
    }
}
