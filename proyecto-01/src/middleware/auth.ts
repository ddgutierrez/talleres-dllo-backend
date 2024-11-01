import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        // Extraer el token del encabezado
        const token = authHeader.split(" ")[1];
        
        // Verificar el token
        const jwtValues = jwt.verify(token, process.env.JWT_SECRET || "secret");

        // Adjuntar los valores decodificados al objeto `request`
        request.body.user = jwtValues;
        
        next();
    } catch (err) {
        return response.status(401).json({
            message: "Invalid or expired token."
        });
    }
}
