import { executeQuery } from './dbService';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../types/apiResponse';
import { userQueries } from '../queries/userQueries.sql';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRound = Number(process.env.SALT_ROUND);
const secret = String(process.env.SECRET_TOKEN);

export class UserService {
    async fetchAllUsers(): Promise<User[]> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(userQueries.SELECT_ALL_USERS);
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                throw new Error(`No users found in the database.`);
            }
        });
    }

    async fetchUserInformation(user_id: number): Promise<{ user: User; token: string }> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(userQueries.SELECT_USER_BY_ID, [user_id]);
            if (result.rows && result.rows.length > 0) {
                const user = result.rows[0];
                const token = jwt.sign({ userName: user.user_name, id: user.id }, secret);
                return {
                    user: user,
                    token: token
                };
            } else {
                throw new Error(`User with ID ${user_id} does not exist.`);
            }
        });
    }

    async registerUser(user: User): Promise<{ data: User; token: string }> {
        return await executeQuery(async (connection) => {
            // Check if the user_name already exists
            const { rows } = await connection.query(userQueries.CHECK_USER_EXISTENCE, [user.user_name]);
            if (rows[0].exists) {
                throw new Error("User name already taken. Please choose another one.");
            }

            // Insert the new user
            const hashedPassword = bcrypt.hashSync(user.password + pepper, saltRound);
            const result = await connection.query(userQueries.INSERT_USER, [user.first_name, user.last_name, user.user_name, hashedPassword]);
            const createdUser = result.rows[0];
            const token = jwt.sign({ userName: createdUser.user_name, id: createdUser.id }, secret);
            
            return {
                data: createdUser,
                token
            };
        });
    }

    async deleteUser(userId: number): Promise<string> {
        return await executeQuery(async (connection) => {
            // Check if the user exists
            const existingUser = await connection.query(userQueries.SELECT_USER_BY_ID, [userId]);
            if (existingUser.rows.length === 0) {
                throw new Error("User not found. Unable to delete.");
            }

            // Delete the user
            await connection.query(userQueries.DELETE_USER, [userId]);
            return `User with ID ${userId} has been successfully deleted.`;
        });
    }

    async updateUser(userId: number, updatedData: Partial<User>): Promise<{ data: User; message: string }> {
        return await executeQuery(async (connection) => {
            // Check if the user exists
            const existingUser = await connection.query(userQueries.SELECT_USER_BY_ID, [userId]);
            if (existingUser.rows.length === 0) {
                throw new Error("User not found. Update operation cannot be completed.");
            }

            const setClause = Object.keys(updatedData).map((key, index) => `${key} = $${index + 1}`).join(", ");
            const sqlUpdate = userQueries.UPDATE_USER(setClause);
            
            const values = [...Object.values(updatedData), userId];
            const result = await connection.query(sqlUpdate, values);
            const updatedUser = result.rows[0];

            return {
                data: updatedUser,
                message: `User with ID ${userId} has been successfully updated.`,
            };
        });
    }
}