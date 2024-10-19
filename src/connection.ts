import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

// Create the database connection pool
const client = new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

// Log successful connection
client.connect()
    .then(() => console.log("Connected to Database"))
    .catch(err => console.error("Database connection error:", err));

// Export the client for use in other modules
export default client;