import { UserType} from "./user.model";
import readUserAction from "./read.user.action";

async function readUsers(): Promise<UserType[]> {
  const users = readUserAction();
  return users;
}

async function userExists(id: number): Promise<boolean> {
  const users = await readUserAction();
  return users.some(user => user.id === id);
}

async function findUsersByHobby(hobby: string): Promise<UserType[]> {
  const users = await readUserAction();
  return users.filter(user => user.hobbies?.includes(hobby));
}

async function getTeamExperience(team: string): Promise<number> {
  const users = await readUserAction();
  return users
    .filter(user => user.team === team)
    .reduce((total, user) => total + (user.years || 0), 0);
}

async function findUsersByFaction(faction: string): Promise<UserType[]> {
  const users = await readUserAction();
  return users.filter(user => user.faction === faction);
}

async function registerUser(newUser: UserType): Promise<UserType> {
  const users = await readUserAction();

  const existingUser = await userExists(newUser.id);
  if (existingUser) {
    throw new Error(`User with ID ${newUser.id} already exists.`);
  }

  users.push(newUser);
  return newUser;
}

// EXPORT CONTROLLER FUNCTIONS
export {
  readUsers,
  userExists,
  findUsersByHobby,
  getTeamExperience,
  findUsersByFaction,
  registerUser
};
