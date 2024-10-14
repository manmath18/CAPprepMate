import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/ConnectDB.js";
import cors from "cors";
import userRoute from "./routes/user.routes.js"

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})