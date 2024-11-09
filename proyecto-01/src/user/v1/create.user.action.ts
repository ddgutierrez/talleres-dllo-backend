import { UserModel, UserType } from "./user.model";

// Action to create a new user
export async function createUser(userData: Partial<UserType>): Promise<Partial<UserType>> {
    // Create a new User instance
    const newUser = new UserModel(userData);

    // Save the user to MongoDB
    const savedUser = await newUser.save();
    return savedUser;
}