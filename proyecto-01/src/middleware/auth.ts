import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../user/v1/user.model";  // Asegúrate de que la ruta de importación sea correcta

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
        
        // Verificar el token y hacer type assertion para JwtPayload
        const jwtValues = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;

        // Verificar que el payload tenga un campo `id`
        if (!jwtValues || typeof jwtValues !== 'object' || !jwtValues.id) {
            return response.status(401).json({
                message: "Token inválido: ID de usuario no encontrado."
            });
        }

        // Buscar el usuario en la base de datos para obtener los permisos
        const user = await UserModel.findById(jwtValues.id);

        if (!user) {
            return response.status(401).json({
                message: "User not found."
            });
        }

        // Adjuntar el usuario completo al objeto `request`, incluyendo los permisos
        request.body.user = {
            id: user._id,
            email: user.email,
            permissions: user.permissions,  // Asegúrate de que el modelo de usuario tenga este campo
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
