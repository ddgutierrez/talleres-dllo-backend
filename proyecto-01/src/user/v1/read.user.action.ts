import { UserModel } from "./user.model";
import mongoose from "mongoose";

// Action to fetch users by ID or filters
export async function getUsers(filters: any, id?: string, includeDisabled?: boolean): Promise<any> {
    try {
        // If an ID is provided, fetch a single user
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid user ID");
            }
            
            const user = await UserModel.findById(id).select('-password');
            if (!user || (!user.active && !includeDisabled)) {
                throw new Error("User not found or deactivated");
            }
            return user;
        }

        // Fetch active users by default
        const queryFilters: any = {
            ...(includeDisabled !== true && { active: true })  // Filter only active users if includeDisabled is not true
        };

        // Fetch users
        const users = await UserModel.find({ ...queryFilters, ...filters }).select('-password');
        return users;
    } catch (err: any) {
        throw new Error(err.message || "Unknown error occurred");
    }
}