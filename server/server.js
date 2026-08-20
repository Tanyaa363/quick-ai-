import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Initialize Cloudinary asynchronously
connectCloudinary().catch((err) =>
  console.error("Cloudinary init error:", err.message)
);

// Universal CORS & Preflight middleware for Vercel Serverless deployments
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["*"],
  })
);



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

// Mount API routers across all possible Vercel rewrite URL variations
app.use("/api/ai", aiRouter);
app.use("/ai", aiRouter);

app.use("/api/user", userRouter);
app.use("/user", userRouter);

// Fallback mounts for single-level rewrites or stripped paths
app.use("/api", aiRouter);
app.use("/api", userRouter);


// 404 handler for unhandled API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ success: false, message: "API endpoint not found" });
  }
  next();
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

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT} => http://localhost:${PORT} 🍽️`
    );
  });
}

export default app;


