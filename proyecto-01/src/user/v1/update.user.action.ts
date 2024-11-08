import { Request, Response } from "express";
import { UserModel, UserType } from "./user.model";

// Acción para actualizar la información de un usuario
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, permissions } = req.body as Partial<Omit<UserType, '_id'>>;

    // Usuario autenticado del middleware
    const authenticatedUser = req.body.user;

    if (!authenticatedUser) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    // Verificar si el usuario autenticado es el mismo que el que se va a actualizar o si tiene permisos para actualizar usuarios
    if (authenticatedUser.id !== id && !authenticatedUser.permissions.includes('update-user')) {
        return res.status(403).json({ message: "You dont have permissions to update user" });
    }

    // Verificar si se proporcionaron campos para la actualización
    if (!name && !email && !permissions) {
        return res.status(400).json({ message: "Provide all fields to update" });
    }

    try {
        // Buscar al usuario en la base de datos
        const user = await UserModel.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Actualizar los campos proporcionados
        if (name) user.name = name;
        if (email) user.email = email;
        if (permissions && authenticatedUser.permissions.includes('update-permissions')) {
            user.permissions = permissions;  // Solo los usuarios con permiso pueden actualizar permisos
        }

        // Guardar el documento actualizado
        const updatedUser = await user.save();
        return res.json({ message: "Updated user", user: updatedUser });
    } catch (err: any) {
        // Manejo seguro del mensaje de error
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        return res.status(500).json({ message: "Error updating user", error: errorMessage });
    }
}
