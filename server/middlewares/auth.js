import { clerkClient } from "@clerk/express";

// Middleware to track Clerk user plan and 10-generation free usage limit
export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Sign in required" });
    }

    let hasPremiumPlan = false;
    if (typeof has === "function") {
      try {
        hasPremiumPlan = await has({ plan: "premium" });
      } catch (err) {
        hasPremiumPlan = false;
      }
    }

    const user = await clerkClient.users.getUser(userId);
    const free_usage = user.privateMetadata?.free_usage ?? 0;

    req.plan = hasPremiumPlan ? "premium" : "free";
    req.free_usage = Number(free_usage);

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};



