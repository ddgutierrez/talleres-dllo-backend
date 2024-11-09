import { BookModel, BookType } from "./book.model";

// Action to get books by filters or by ID
export async function getBooks(filters: any, id?: string): Promise<BookType | BookType[]> {
    try {
        // If an ID is provided, fetch a single book
        
        if (id) {
            const book = await BookModel.findById(id); // Assuming password field is irrelevant for books
            if (!book) {
                throw new Error("Book not found");
            }
            return book;
        }

        const books = await BookModel.find(filters);

        return books;
    } catch (err: any) {
        throw new Error(err.message || "Unknown error occurred");
    }
}
