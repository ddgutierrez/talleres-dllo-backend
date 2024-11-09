import { UserModel, UserType } from "./user.model";

// Action to deactivate a user (soft delete)
export async function deleteUser(id: string): Promise<UserType | null> {
    return await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: { active: false } },
        { new: true }
    ).select('-password');
}