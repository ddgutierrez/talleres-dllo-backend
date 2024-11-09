import { BookModel, BookType } from "./book.model";

export async function deleteBook(id: string): Promise<BookType | null> {
    return await BookModel.findOneAndUpdate(
        { _id: id },
        { $set: { active: false } },
        { new: true }
    )
}
