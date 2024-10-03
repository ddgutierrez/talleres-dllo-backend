import { Router, Request, Response } from "express";
import { readUsers, userExists, findUsersByHobby, getTeamExperience, findUsersByFaction, registerUser } from "./user.controller";

const userRoutes = Router();

async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();
  response.status(200).json({users: users });
}

async function UserExists(request: Request, response: Response) {
  const id = parseInt(request.query.id as string);
  const exists = await userExists(id);
  response.status(200).json({ exists: exists });
}

async function FindUsersByHobby(request: Request, response: Response) {
  const hobby = request.query.hobby as string;
  const users = await findUsersByHobby(hobby);
  response.status(200).json({ users: users });
}

async function GetTeamExperience(request: Request, response: Response) {
  const team = request.query.team as string;
  const totalExperience = await getTeamExperience(team);
  response.status(200).json({ totalExperience: totalExperience });
}

async function FindUsersByFaction(request: Request, response: Response) {
  const faction = request.query.faction as string;
  const users = await findUsersByFaction(faction);
  response.status(200).json({ users: users });
}

async function RegisterUser(request: Request, response: Response) {
  try {
    const newUser = request.body;
    if (!newUser.id) {
      return response.status(400).json({ message: "ID is required to create a new user." });
    }

    const user = await registerUser(newUser);
    response.status(201).json({ message: "User created successfully.", user: user });
  } catch (error: any) {
    response.status(400).json({ message: error.message });
  }
}

userRoutes.get("/", GetUsers);
userRoutes.get("/exists", UserExists);
userRoutes.get("/hobby", FindUsersByHobby);
userRoutes.get("/team-experience", GetTeamExperience);
userRoutes.get("/by-faction", FindUsersByFaction);
userRoutes.post("/", RegisterUser);

export default userRoutes;