import { BookModel, BookType } from "./book.model";

// Action to create a new book
export async function createBook(bookData: Partial<BookType>): Promise<Partial<BookType>> {
    // Create a new Book instance
    const newBook = new BookModel(bookData);

    // Save the book to MongoDB
    const savedBook = await newBook.save();
    return savedBook;
}