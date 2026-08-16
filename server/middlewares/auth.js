import { clerkClient } from "@clerk/express";

// Middleware to authorize user and grant 100% unlimited access to all features
export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Sign in required" });
    }

    req.plan = "premium";
    req.free_usage = 0;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
