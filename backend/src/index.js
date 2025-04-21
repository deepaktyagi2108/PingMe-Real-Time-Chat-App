
import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { io, app, server } from './lib/socket.js';
import bodyParser from 'body-parser';

dotenv.config();


const __dirname = path.resolve();

// Port fallback for local/dev environments
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"], 
  credentials: true,
}));

app.use(bodyParser.json({ limit: '10mb' }));  
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDB();
});

