import { UserType } from "./user.model";

export type CreateUserType = Omit<UserType, "id">
export type UpdateUserType = Omit<Partial<UserType>, "id">