import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model";

// Acción para iniciar sesión
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por correo electrónico
        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Correo o contraseña inválidos" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.permissions },
            process.env.JWT_SECRET || "secret",  // Usa una variable de entorno para la clave secreta
            { expiresIn: "1h" }  // Tiempo de expiración del token
        );        

        // Enviar el token en la respuesta
        return res.json({ message: "Inicio de sesión exitoso", token, user: { id: user._id, email: user.email, name: user.name, role: user.permissions } });
    } catch (err: any) {
        // Verificar si el error es una instancia de Error y obtener el mensaje de forma segura
        const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido";
        return res.status(500).json({ message: "Error durante el inicio de sesión", error: errorMessage });
    }
}
