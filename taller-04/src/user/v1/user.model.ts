import { model, Schema } from "mongoose";

type UserType = {
  id: number;
  name: string;
  carrera?: string;
  hobbies?: string[];
  years?: number; 
  team?: string; 
  faction?: string; 
}

const UserSchema =  new Schema<UserType>({
  id: {type: Number, required: true, unique:true},
  name: {type: String, required: true},
  carrera: {type: String},
  hobbies: {type: [String]},
  years: {type: Number},
  team: {type: String},
  faction: {type: String}
});

const UserModel = model<UserType>("User", UserSchema);

export { UserType, UserSchema, UserModel};