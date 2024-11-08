import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config();

// Login action
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required and must be a string" });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: "Password is required and must be a string" });
    }

    try {
        // Authenticate user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Ensure JWT secret is provided
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.permissions },
            jwtSecret,  
            { expiresIn: "1h" }
        );

        // Enviar el token en la respuesta
        return res.json({ message: "Successful login", token, user: { id: user._id, email: user.email, name: user.name, role: user.permissions } });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "Unkonwn error occurred";
        return res.status(500).json({ message: "Error during login", error: errorMessage });
    }
}
