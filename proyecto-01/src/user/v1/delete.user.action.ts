import { Request, Response } from "express";
import { UserModel } from "./user.model";

// Acción para desactivar a un usuario (soft delete)
export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    // Usuario autenticado del middleware
    const authenticatedUser = req.body.user;

    if (!authenticatedUser) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    // Verificar si el usuario autenticado es el mismo que el que se va a desactivar o si tiene permisos para desactivar usuarios
    if (authenticatedUser.id !== id && !authenticatedUser.permissions.includes('delete-user')) {
        return res.status(403).json({ message: "You dont have permission to delete users" });
    }

    try {
        // Buscar al usuario por ID
        const user = await UserModel.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verificar si el usuario ya está desactivado
        if (!user.active) {
            return res.status(400).json({ message: "User is already deactivated" });
        }

        // Marcar al usuario como inactivo (soft delete)
        user.active = false;
        await user.save();

        res.json({ message: "User deactivated", user });
    } catch (err: any) {
        // Manejo seguro del mensaje de error
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        return res.status(500).json({ message: "Error deactivating user", error: errorMessage });
    }
}
