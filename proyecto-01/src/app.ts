import express from "express";
import cors from "cors";
import userRoutes from "./user/v1/user.routes";
import bookRoutes from "./book/v1/book.routes";

// Function to create and configure the Express app
export default function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/v1/users", userRoutes);  // Ruta para usuarios
    app.use("/api/v1/books", bookRoutes);  // Ruta para libros

    return app;  // Retornamos la aplicación configurada
}
