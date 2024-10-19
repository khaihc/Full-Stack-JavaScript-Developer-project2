import client from '../connection';

export async function executeQuery<T>(query: (connection: any) => Promise<T>): Promise<T> {
    const connection = await client.connect();
    try {
        return await query(connection);
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database operation failed: ${(error as Error).message || "Unknown error"}`);
    } finally {
        connection.release();
    }
}