import { Schema, model } from "mongoose";

// DECLARE MODEL TYPE
export type UserType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    permissions: string[];  // Arreglo de permisos
    active: boolean;
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],  // Define un arreglo de strings para los permisos
        default: []  // Por defecto, el usuario no tiene permisos
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt fields
    versionKey: false  // Disables __v (versioning field)
});

// DECLARE MONGO MODEL
export const UserModel = model<UserType>("User", UserSchema);
