import { clerkClient } from "@clerk/express";

// Middleware to authorize user
export const auth = async (req, res, next) => {
  try {
    if (!req.auth) {
      return res.status(401).json({ success: false, message: "Unauthorized: Sign in required" });
    }

    const authObj = typeof req.auth === "function" ? await req.auth() : req.auth;
    const userId = authObj?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Sign in required" });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
