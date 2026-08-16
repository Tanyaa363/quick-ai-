import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(
  clerkMiddleware({
    publishableKey:
      process.env.CLERK_PUBLISHABLE_KEY ||
      "pk_test_ZXhhbXBsZS1jbGVyay1rZXkuY2xlcmsuYWNjb3VudHMuZGV2JA",
    secretKey: process.env.CLERK_SECRET_KEY || "sk_test_placeholder_secret_key",
  })
);

app.get("/", (req, res) => res.send("Server is Live!"));

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);


// 404 handler for unhandled API routes
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} => http://localhost:${PORT} 🍽️`
  );
});

