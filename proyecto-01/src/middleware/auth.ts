import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../user/v1/user.model";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        // Extract the token from the header
        const token = authHeader.split(" ")[1];
        
        // Verify the token and make type assertion for JwtPayload
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        const jwtValues = jwt.verify(token, jwtSecret) as JwtPayload;

        // Verify that the payload has an `id` field
        if (!jwtValues || typeof jwtValues !== 'object' || !jwtValues.id) {
            return response.status(401).json({
                message: "Invalid token: User ID not found."
            });
        }

        // Find the user in the database to get the permissions
        const user = await UserModel.findById(jwtValues.id);

        if (!user) {
            return response.status(401).json({
                message: "User not found."
            });
        }

        // Attach the full user object to the `request` object, including permissions
        request.body.user = {
            id: user._id,
            email: user.email,
            permissions: user.permissions,
            name: user.name,
            active: user.active
        };

        next();
    } catch (err) {
        return response.status(401).json({
            message: "Invalid or expired token."
        });
    }
}
