import { clerkClient } from "@clerk/express";

// Middleware to authorize user
export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

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
