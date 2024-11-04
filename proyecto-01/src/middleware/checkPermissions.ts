import { Request, Response, NextFunction } from "express";

export function checkPermissions(requiredPermissions: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;  // Asegúrate de que el middleware de autenticación ya añadió al usuario en `req.body`

        if (!user || !user.permissions) {
            return res.status(403).json({ message: "Acceso denegado: no se encontraron permisos." });
        }

        const hasPermission = requiredPermissions.some(permission => user.permissions.includes(permission));

        if (!hasPermission) {
            return res.status(403).json({ message: "Acceso denegado: permisos insuficientes." });
        }

        next();
    };
}
