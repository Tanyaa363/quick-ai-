import { useState } from "react";
import { Hash, Sparkles, Wand2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword "${input}" in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Titles generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          AI Blog Title Generator
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 mt-1">
          Generate catchy, SEO-friendly headlines and viral titles for your blog posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form */}
        <Card className="lg:col-span-5 p-6">
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Title Settings
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Keyword or Topic
              </label>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="w-full p-3 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="e.g., Remote Work Productivity Tips"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {blogCategories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      selectedCategory === item
                        ? "bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300"
                        : "bg-slate-50 dark:bg-zinc-800/40 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-bold"
            >
              <Wand2 className="w-4 h-4" /> Generate Titles
            </Button>
          </form>
        </Card>

        {/* Right Column: Output */}
        <Card className="lg:col-span-7 p-6 min-h-[480px] flex flex-col justify-between">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800 mb-4">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              <Hash className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
              Generated Titles
            </h2>
          </div>

          {loading ? (
            <div className="space-y-4 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : !content ? (
            <EmptyState
              icon={Hash}
              title="Title Studio Ready"
              description="Type your topic on the left, pick a category, and click 'Generate Titles'."
              className="flex-1 border-none bg-transparent"
            />
          ) : (
            <div className="flex-1 overflow-y-auto max-h-[500px] pr-2">
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-900 dark:text-zinc-100 leading-relaxed bg-slate-50 dark:bg-zinc-950/80 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
                <div className="reset-tw">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BlogTitles;

