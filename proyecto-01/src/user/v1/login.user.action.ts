import { UserModel } from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Action to authenticate user and generate JWT token
export async function loginUser(email: string, password: string): Promise<{ token: string, user: any } | null> {
    // Authenticate user
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    // Ensure JWT secret is provided
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT secret is not defined");
    }

    // Generate token with 1-hour expiration
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.permissions },
        jwtSecret,
        { expiresIn: "1h" }
    );

    return { token, user: { id: user._id, email: user.email, name: user.name, role: user.permissions } };
}