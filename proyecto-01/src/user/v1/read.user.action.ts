import { Request, Response } from "express";
import { UserModel } from "./user.model";

// Acción para buscar usuarios por ID o filtros
export async function getUsers(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { includeDisabled } = req.query;

        // Si se proporciona un ID, buscar un solo usuario
        if (id) {
            const user = await UserModel.findById(id).select('-password');
            if (!user || (!user.active && !includeDisabled)) {
                return res.status(404).json({ message: "Usuario no encontrado o inhabilitado" });
            }
            return res.json(user);
        }

        // Buscar usuarios activos por defecto
        const filters: any = {
            ...(includeDisabled !== 'true' && { active: true })  // Filtrar solo activos si includeDisabled no es 'true'
        };

        // Buscar usuarios
        const users = await UserModel.find(filters).select('-password');
        return res.json(users);
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido";
        return res.status(500).json({ message: "Error al buscar usuarios", error: errorMessage });
    }
}
