import sql from "../configs/db.js";

// Helper function to safely extract userId from Clerk auth object in all environments
const getUserId = async (req) => {
  if (!req.auth) return null;
  if (typeof req.auth === "function") {
    const authObj = await req.auth();
    return authObj?.userId;
  }
  return req.auth?.userId;
};

export const getUserCreations = async (req, res) => {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Sign in required" });
    }

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("getUserCreations Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("getPublishedCreations Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Sign in required" });
    }

    const { id } = req.body;
    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdString = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdString)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdString);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIdString];
      message = "Creation Liked";
    }

    const formattedArray = `{${updatedLikes.join(",")}}`;

    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    res.json({ success: true, message });
  } catch (error) {
    console.error("toggleLikeCreation Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
