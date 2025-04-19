
// import express from "express";
// import authRoutes from "./routes/auth.route.js";
// import { connectDB } from "./lib/db.js";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import messageRoute from "./routes/message.route.js"; // Import messageRoute correctly
// import cors from "cors";
// import path from"path";
// import { io, app, server } from './lib/socket.js';

// dotenv.config();


// const PORT = process.env.PORT;

// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());

// // CORS configuration to allow cross-origin requests
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     credentials: true, // Allow sending cookies
//   })
// );

// // Routes setup
// app.use("/api/auth", authRoutes); // Auth routes
// app.use("/api/messages", messageRoute); // Use messageRoute here instead of authRoutes
// if(process.env.NODE-ENV==="production"){
//   app.use(express.static(path.join(__dirname,"../frontend/dist")))
//   app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"../frontend","dist","index.html")) 
//   })
// }

// server.listen(PORT, () => {
//   console.log("Server is running on port:" + PORT);
//   connectDB(); // Connect to the database
// });
import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { io, app, server } from './lib/socket.js';

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port fallback for local/dev environments
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Update this if your frontend is hosted elsewhere
  credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("✅ Server running on port:", PORT);
  connectDB(); // Establish DB connection
});

