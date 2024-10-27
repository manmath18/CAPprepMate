import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/ConnectDB.js";
import cors from "cors";
import userRoute from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS options
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};




// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true,  // Allow credentials (cookies, etc.)
}));


// Set the port from environment variable or default to 3000
const PORT = 3001;

// Define routes
app.use("/api", userRoute);

// Connect to the database and start the server
const startServer = async () => {
    try {
        await connectDB(); // Ensure database connection
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit process with failure
    }
};

startServer();
