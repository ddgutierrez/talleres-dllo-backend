import { Request, Response } from "express";
import { BookModel } from "./book.model";

// Acción para buscar libros por ID o filtros
export async function getBooks(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { includeDisabled } = req.query;

        // Si se proporciona un ID, buscar un solo libro
        if (id) {
            const book = await BookModel.findById(id);
            if (!book || (!book.available && !includeDisabled)) {
                return res.status(404).json({ message: "Libro no encontrado" });
            }
            return res.json(book);
        }

        // Si no se proporciona un ID, buscar con filtros
        const { genre, author, publishedDate, publisher, title, available } = req.query;

        // Construir el objeto de filtros dinámicamente
        const filters: any = {
            ...(includeDisabled !== 'true' && { active: true })  // Filtra solo activos si includeDisabled no es 'true'
        };
        if (genre) filters.genre = genre;
        if (author) filters.author = author;
        if (publishedDate) filters.publishedDate = new Date(publishedDate as string);
        if (publisher) filters.publisher = publisher;
        if (title) filters.title = { $regex: title, $options: 'i' };  // Búsqueda insensible a mayúsculas
        if (available !== undefined) filters.available = available === 'true';

        // Buscar libros que coincidan con los filtros
        const books = await BookModel.find(filters);
        return res.json(books);
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido";
        return res.status(500).json({ message: "Error al buscar libros", error: errorMessage });
    }
}
