import { Router, Request, Response } from "express";
import { createUser, readUsers } from "./user.controller";
import { CreateUserType } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";
import { UserType } from "./user.model";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}
async function CreateUser(request: Request<CreateUserType>, response: Response) {
  if (request.body.name === undefined) {
    return response.status(400).json({
      message: "Missing fields"
    })
  }

  try {
    const users = await createUser(request.body);
    
    response.status(200).json({
      message: "Success.",
      users: users,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    })
  }
}
async function GetOneUser(request: Request<{user: UserType}>, response: Response) {
  console.log(request.query)
  console.log(request.body)
  const users = await readUsers(request.body);

  response.status(200).json({
    message: "Success.",
    users: users,
  });
}

// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/one", AuthMiddleware, GetOneUser);
userRoutes.post("/", CreateUser);

// EXPORT ROUTES
export default userRoutes;
