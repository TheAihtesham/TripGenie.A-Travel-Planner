import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"
import planRoutes from "./routes/planRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/plan", planRoutes);

app.get("/", (req, res) => {
  res.send("TripGenie API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
