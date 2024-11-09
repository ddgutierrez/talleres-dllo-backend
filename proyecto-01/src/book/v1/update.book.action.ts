import { BookModel } from "./book.model";

// Action to update a book's information
export async function updateBook(id: string, updateData: any) {
    const book = await BookModel.findById(id);
    if (!book) {
        return null;
    }

    // Aplicar los cambios
    Object.assign(book, updateData);

    const updatedBook = await book.save();
    return updatedBook;
}