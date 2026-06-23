import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import analyticsRoutes from "./routes/analytics.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

export default app;
