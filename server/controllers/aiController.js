import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY || "placeholder_key",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Helper function to sanitize AI output by stripping internal reasoning/thinking tags
const cleanAIResponse = (text) => {
  if (!text) return "";
  return text.replace(/<thought>[\s\S]*?<\/thought>/gi, "").trim();
};

// Helper function to enforce 10 free generations limit for non-pro users
const checkAndIncrementUsage = async (userId, plan, free_usage) => {
  if (plan !== "premium" && free_usage >= 10) {
    return {
      allowed: false,
      message: "You have reached your limit of 10 free generations. Upgrade to Pro for unlimited access!",
    };
  }

  if (plan !== "premium") {
    try {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    } catch (err) {
      console.error("Error updating Clerk free_usage metadata:", err.message);
    }
  }

  return { allowed: true };
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const { plan, free_usage } = req;

    const usageCheck = await checkAndIncrementUsage(userId, plan, free_usage);
    if (!usageCheck.allowed) {
      return res.json({ success: false, isLimitReached: true, message: usageCheck.message });
    }

    const targetWords = length ? parseInt(length) : 1200;
    const maxTokens = Math.max(3000, Math.ceil(targetWords * 3.0));

    const response = await AI.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an exhaustive, world-class long-form author and subject matter strategist. You MUST fulfill the requested target length of at least ${targetWords} words. Expand each section deeply with clear Markdown subheadings (H2, H3), real-world case studies, actionable frameworks, deep-dive analysis, and step-by-step guides. Do not summarize or stop early. Write in clean Markdown and do NOT output internal reasoning or <thought> tags.`,
        },
        {
          role: "user",
          content: `Write a comprehensive, exhaustive long-form article on the following topic:\n\n${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    });

    const rawContent = response.choices[0].message.content;
    const content = cleanAIResponse(rawContent);

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article') `;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    const usageCheck = await checkAndIncrementUsage(userId, plan, free_usage);
    if (!usageCheck.allowed) {
      return res.json({ success: false, isLimitReached: true, message: usageCheck.message });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are an elite copywriter and viral SEO marketing specialist. Generate 12 to 15 highly engaging, high-converting, click-worthy blog title options based on the user request. Categorize them under headings (e.g., 'How-To & Guides', 'Listicles & Roundups', 'Thought Leadership & Controversial', 'SEO & High-Intent'). For each title, include a brief 1-sentence breakdown of why it drives high CTR. Format in clean Markdown and do NOT output internal reasoning or <thought> tags.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const rawContent = response.choices[0].message.content;
    const content = cleanAIResponse(rawContent);

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title') `;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const { plan, free_usage } = req;

    const usageCheck = await checkAndIncrementUsage(userId, plan, free_usage);
    if (!usageCheck.allowed) {
      return res.json({ success: false, isLimitReached: true, message: usageCheck.message });
    }

    let imageUrl = "";

    if (process.env.CLIPDROP_API_KEY) {
      try {
        const formData = new FormData();
        formData.append("prompt", prompt);
        const { data } = await axios.post(
          "https://clipdrop-api.co/text-to-image/v1",
          formData,
          {
            headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
            responseType: "arraybuffer",
          }
        );

        const base64Image = `data:image/png;base64,${Buffer.from(
          data,
          "binary"
        ).toString("base64")}`;

        const { secure_url } = await cloudinary.uploader.upload(base64Image);
        imageUrl = secure_url;
      } catch (apiErr) {
        console.error("ClipDrop API failed, using Pollinations AI generator:", apiErr.message);
        const seed = Math.floor(Math.random() * 1000000);
        imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&seed=${seed}&nologo=true`;
      }
    } else {
      const seed = Math.floor(Math.random() * 1000000);
      imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&seed=${seed}&nologo=true`;
    }

    await sql` INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${imageUrl}, 'image', ${
      publish ?? false
    }) `;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const { plan, free_usage } = req;

    const usageCheck = await checkAndIncrementUsage(userId, plan, free_usage);
    if (!usageCheck.allowed) {
      return res.json({ success: false, isLimitReached: true, message: usageCheck.message });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image') `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const { plan, free_usage } = req;

    const usageCheck = await checkAndIncrementUsage(userId, plan, free_usage);
    if (!usageCheck.allowed) {
      return res.json({ success: false, isLimitReached: true, message: usageCheck.message });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image') `;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const { plan, free_usage } = req;

    const usageCheck = await checkAndIncrementUsage(userId, plan, free_usage);
    if (!usageCheck.allowed) {
      return res.json({ success: false, isLimitReached: true, message: usageCheck.message });
    }

    if (resume.size > 10 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed limit (10MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Perform an exhaustive, professional executive ATS resume evaluation for the following resume:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a principal executive recruiter and expert ATS resume analyst. Provide an exhaustive, deeply detailed, and professionally structured evaluation formatted in clean Markdown. You MUST cover 6 detailed sections: 1) Overall ATS Compatibility Score & Verdict (0-100), 2) Executive Strengths Breakdown, 3) Critical Flaws & High-Risk Weaknesses, 4) Line-by-Line Bullet Point Rewrites (Before vs. After with metrics), 5) Missing Hard Skills & Industry Keywords Audit, and 6) Strategic Action Plan to Guarantee Interviews. Do NOT output internal reasoning or <thought> tags.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const rawContent = response.choices[0].message.content;
    const content = cleanAIResponse(rawContent);

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review') `;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



