import { UserModel, UserType } from "./user.model";

// Action to update a user's information
export async function updateUser(id: string, updateData: Partial<Omit<UserType, '_id'>>): Promise<UserType | null> {
    // Find the user by ID and update the provided fields
    const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    ).select('-password');

    return updatedUser;
}