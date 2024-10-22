import client from "../connection";
import { Pool, PoolClient } from 'pg';

export async function executeQuery<T>(query: (connection: PoolClient) => Promise<T>): Promise<T> {
    if (!client) {
        throw new Error("Database client is not initialized.");
    }

    const connection: PoolClient = await client.connect();
    try {
        return await query(connection);
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database operation failed: ${(error as Error).message || "Unknown error"}`);
    } finally {
        connection.release();
    }
}