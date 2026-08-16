import { Edit, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write a detailed article about "${input}" in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Article generated successfully!");
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          AI Article Writer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Generate comprehensive, SEO-optimized articles on any topic with custom length options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Configuration */}
        <Card className="lg:col-span-5 p-6">
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Article Settings
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Article Topic or Headline
              </label>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g., The Future of Artificial Intelligence in Healthcare"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Target Length
              </label>
              <div className="flex flex-col gap-2">
                {articleLength.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedLength(item)}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                      selectedLength.text === item.text
                        ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full"
            >
              <Wand2 className="w-4 h-4" /> Generate Article
            </Button>
          </form>
        </Card>

        {/* Right Column: Content Output */}
        <Card className="lg:col-span-7 p-6 min-h-[500px] flex flex-col justify-between">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <Edit className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Generated Content
            </h2>
          </div>

          {loading ? (
            <div className="space-y-4 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : !content ? (
            <EmptyState
              icon={Edit}
              title="Ready to Write"
              description="Configure your topic and length on the left, then click 'Generate Article' to produce AI content."
              className="flex-1 border-none bg-transparent"
            />
          ) : (
            <div className="flex-1 overflow-y-auto max-h-[600px] pr-2">
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
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

export default WriteArticle;

