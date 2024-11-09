import { Request, Response } from "express";
import { createBook } from "./create.book.action";
import { getBooks } from "./read.book.action";
import { updateBook } from "./update.book.action";
import { deleteBook } from "./delete.book.action";
import { BookModel, BookType } from "./book.model";
import mongoose from "mongoose";

// Controller to handle all book-related actions

export async function createBookController(req: Request, res: Response) {
    const { title, author, genre, publishedDate, available, editorial, active } = req.body as Omit<BookType, '_id'>;
    const id = req.body.user.id;
     // Validate required fields
     if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: "Title is required and must be a string" });
    }
    if (!author || typeof author !== 'string') {
        return res.status(400).json({ message: "Author is required and must be a string" });
    }
    if (!genre || typeof genre !== 'string') {
        return res.status(400).json({ message: "Genre is required and must be a string" });
    }
    if (!publishedDate ) {
        return res.status(400).json({ message: "Published date is required and must be a valid date" });
    }
    if (!editorial || typeof editorial !== 'string') {
        return res.status(400).json({ message: "Editorial is required and must be a string" });
    }
    try {

        // Prepare book data
        const bookData: Partial<BookType> = {
            title,
            author,
            genre,
            publishedDate: new Date(publishedDate),
            available: true, 
            editorial, 
            active: true 
        };

        // Create book
        const book = await createBook(bookData);
        res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
            res.status(500).json({ message: "Error creating book", error });
    }
}

// Controller function to get books by filters or by ID
export async function getBooksController(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, genre, publishedDate, available, editorial, active } = req.query;

    try {
        // Validate ID if provided
        if (id && !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "A correct Book ID is required" });
        }

        // Create a query object based on the provided filters
        const filters: any = {};
        if (genre) filters.genre = genre;
        if (publishedDate) filters.publishedDate = publishedDate;
        if (author) filters.author = author;
        if (title) filters.title = title;
        if (available) filters.available = available;
        if (editorial) filters.editorial = editorial;
        if (active !== undefined) {
            filters.active = active;
        } else {
            filters.active = true; // Por defecto, solo devuelve las entradas activas
        }
        // Fetch books
        const books = await getBooks(filters, id);
        return res.json({ message: "Books retrieved successfully", books });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return res.status(500).json({ message: "Error fetching books", error: errorMessage });
    }
}

// Controller function to update a book
export async function updateBookController(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, genre, publishedDate, available, editorial } = req.body;


    // Verificar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    // Verificar si se han proporcionado campos para la actualización
    if (!title && !author && !genre && !publishedDate && available === undefined && !editorial) {
        return res.status(400).json({ message: "Provide fields to update" });
    }

    try {
        // Preparar los datos de actualización
        const updateData: any = {};
        if (title) updateData.title = title;
        if (author) updateData.author = author;
        if (genre) updateData.genre = genre;
        if (publishedDate) updateData.publishedDate = publishedDate;
        if (available !== undefined) updateData.available = available;
        if (editorial) updateData.editorial = editorial;

        // Llamar a la acción para actualizar el libro
        const updatedBook = await updateBook(id, updateData);
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ message: "Book updated successfully", book: updatedBook });
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        return res.status(500).json({ message: "Error updating book", error: errorMessage });
    }
}

// Controller function to deactivate (soft delete) a book
export async function deleteBookController(req: Request, res: Response) {
    const { id } = req.params;

    // Verify if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    // Find the book by ID
    const book = await BookModel.findById(id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Verify if the book is already deactivated
    if (!book.active) {
        return res.status(400).json({ message: "Book is already deactivated" });
    }

    try {
        // Deactivate book
        const updatedBook = await deleteBook(id);
        res.json({ message: "Book deactivated", book: updatedBook });
    } catch (error: any) {
        res.status(500).json({ message: "Error deactivating book", error: error.message });
    }
}

