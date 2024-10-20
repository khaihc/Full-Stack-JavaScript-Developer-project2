import express, { Request, Response } from 'express'
import { UserService } from '../../services/userService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { sendResponse as sendResponse } from '../../services/responseService';
import auth from '../../middleware/authentication';
import { User } from '../../types/apiResponse';

dotenv.config()
const userRoute = express.Router();
const userService = new UserService();
const serect = String(process.env.SECRET_TOKEN)

// Get All Users from Database
userRoute.get("/", auth, async (req: Request, res: Response) => {
    try {
        const authorizeHeader = req.headers.authorization;
        const token = String(authorizeHeader).split(" ")[1];
        jwt.verify(token, serect)
    } catch (error) {
        res.status(401).send({ message: `${error}` })
    }
    try {
        const users = await userService.fetchAllUsers();
        sendResponse(res, 200, "Successfully retrieved the list of users.", users);
    } catch (error) {
        console.error("Error fetching users:", error);
        sendResponse(res, 500, "An error occurred while fetching users.");
    }
})

// Fetch Information for a Single User
userRoute.get("/:id", auth, async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        // Check if userId is a valid number
        if (!isNaN(userId)) {
            const user = await userService.fetchUserInformation(userId);
            sendResponse(res, 200, "Successfully retrieved user information.", user);
        } else {
            sendResponse(res, 400, "Invalid userId: user id must be a number");
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        sendResponse(res, 500, `Failed to retrieve user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Register User
userRoute.post("/registerUser", async (req: Request, res: Response) => {
    try {
        const newUser: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        console.log(newUser);

        // Validate input
        if (newUser.user_name && newUser.first_name && newUser.last_name && newUser.password ) {
            const signUpUser = await userService.registerUser(newUser);
            sendResponse(res, 200, "Register user successfully", signUpUser);
        } else {
            sendResponse(res, 400, "Please input username, password, firstname, lastname");
        }
    } catch (error) {
        console.error("Error during register user:", error);
        sendResponse(res, 422, `Failed to register user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Updater User
userRoute.put("/:id", auth, async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedData: Partial<User> = req.body;
        const result = await userService.updateUser(userId, updatedData);
        sendResponse(res, 200, result.message, result.data);
    } catch (error) {
        console.error("Error during user update:", error);
        sendResponse(res, 422, `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Delete User
userRoute.delete("/:id", auth, async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const message = await userService.deleteUser(userId);
        sendResponse(res, 200, message);
    } catch (error) {
        console.error("Error during user deletion:", error);
        sendResponse(res, 422, `Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

export default userRoute;