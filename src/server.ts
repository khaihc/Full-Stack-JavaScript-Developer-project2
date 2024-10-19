import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routers from './routes/routes';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT; // Define the port number

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Use the routers for API routes
app.use('/api', routers);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

// Export the app for testing or other uses
export default app;