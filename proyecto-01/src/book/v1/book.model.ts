import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    _id: string;  // Custom ID field
    title: string;
    author: string;
    genre: string;
    publishedDate: Date;
    available: boolean;
    editorial: string;
    active: boolean;
};

// DECLARE MONGOOSE SCHEMA
const BookSchema = new Schema<BookType>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    editorial: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    versionKey: false  // Removes the __v field
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookSchema, BookType };
