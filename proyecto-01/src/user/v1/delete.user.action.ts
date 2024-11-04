import { Request, Response } from "express";
import { UserModel } from "./user.model";

// Acción para desactivar a un usuario (soft delete)
export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    // Usuario autenticado del middleware
    const authenticatedUser = req.body.user;

    if (!authenticatedUser) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // Verificar si el usuario autenticado es el mismo que el que se va a desactivar o si tiene permisos para desactivar usuarios
    if (authenticatedUser.id !== id && !authenticatedUser.permissions.includes('delete-user')) {
        return res.status(403).json({ message: "No tienes permiso para desactivar este usuario" });
    }

    try {
        // Buscar al usuario por ID y marcarlo como inactivo (soft delete)
        const user = await UserModel.findByIdAndUpdate(id, { active: false }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario desactivado", user });
    } catch (err: any) {
        // Manejo seguro del mensaje de error
        const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido";
        return res.status(500).json({ message: "Error al desactivar el usuario", error: errorMessage });
    }
}
