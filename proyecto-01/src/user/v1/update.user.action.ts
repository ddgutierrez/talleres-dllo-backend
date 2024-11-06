import { Request, Response } from "express";
import { UserModel, UserType } from "./user.model";

// Acción para actualizar la información de un usuario
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, permissions } = req.body as Partial<Omit<UserType, '_id'>>;

    // Usuario autenticado del middleware
    const authenticatedUser = req.body.user;

    if (!authenticatedUser) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // Verificar si el usuario autenticado es el mismo que el que se va a actualizar o si tiene permisos para actualizar usuarios
    if (authenticatedUser.id !== id && !authenticatedUser.permissions.includes('update-user')) {
        return res.status(403).json({ message: "No tienes permiso para actualizar este usuario" });
    }

    // Verificar si se proporcionaron campos para la actualización
    if (!name && !email && !permissions) {
        return res.status(400).json({ message: "No se proporcionaron campos para la actualización" });
    }

    try {
        // Buscar al usuario en la base de datos
        const user = await UserModel.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos proporcionados
        if (name) user.name = name;
        if (email) user.email = email;
        if (permissions && authenticatedUser.permissions.includes('update-permissions')) {
            user.permissions = permissions;  // Solo los usuarios con permiso pueden actualizar permisos
        }

        // Guardar el documento actualizado
        const updatedUser = await user.save();
        return res.json({ message: "Usuario actualizado", user: updatedUser });
    } catch (err: any) {
        // Manejo seguro del mensaje de error
        const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido";
        return res.status(500).json({ message: "Error al actualizar el usuario", error: errorMessage });
    }
}
