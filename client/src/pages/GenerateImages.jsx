import { useState } from "react";
import { Image, Sparkles, Wand2, Download, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D Render",
    "Portrait style",
    "Cyberpunk",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }

    try {
      setLoading(true);
      const fullPrompt = `${input.trim()}, ${selectedStyle} style`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt: fullPrompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Image generated successfully!");
      } else {
        toast.error(data.message || "Failed to generate image.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };


  const handleDownload = async () => {
    if (!content) return;
    try {
      setIsDownloading(true);
      const response = await fetch(content);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `QuickAI-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded successfully!");
    } catch (err) {
      // Fallback for direct URL download
      window.open(content, "_blank");
    }
    setIsDownloading(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-2 sm:pt-4 pb-8">
      {/* Header Banner with Top Spacing to prevent clipping */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          AI Image Generator
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 mt-1">
          Turn your text descriptions into photorealistic visuals and digital artwork in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Configuration Form */}
        <Card className="lg:col-span-5 p-6">
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Image Configuration
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Describe Your Image
              </label>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                rows={4}
                className="w-full p-3 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="e.g., A cute Golden Retriever dog running in a sunny park with golden hour lighting..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Art Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                {imageStyle.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setSelectedStyle(item)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      selectedStyle === item
                        ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm"
                        : "bg-slate-50 dark:bg-zinc-800/40 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-800">
              <input
                type="checkbox"
                id="publish-toggle"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
              <label htmlFor="publish-toggle" className="text-xs font-medium text-slate-700 dark:text-zinc-300 cursor-pointer">
                Publish image to QuickAI Community showcase
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold"
            >
              <Wand2 className="w-4 h-4" /> {loading ? "Generating Image..." : "Generate Image"}
            </Button>
          </form>
        </Card>

        {/* Right Column: Generated Asset Card */}
        <Card className="lg:col-span-7 p-6 min-h-[480px] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                <Image className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Generated Visual Asset
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4 flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Skeleton className="w-full h-80 rounded-2xl" />
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing high-resolution AI image...</span>
              </div>
            </div>
          ) : !content ? (
            <EmptyState
              icon={Image}
              title="Visual Canvas Ready"
              description="Type your image description on the left, select an artistic style, and click 'Generate Image'."
              className="flex-1 border-none bg-transparent"
            />
          ) : (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 p-2 shadow-sm">
                <img
                  src={content}
                  alt={input || "Generated AI asset"}
                  className="w-full h-auto max-h-[420px] rounded-xl object-contain mx-auto"
                />
              </div>

              {/* Action Buttons: Download */}
              <div className="flex items-center justify-end pt-2">
                <Button
                  onClick={handleDownload}
                  isLoading={isDownloading}
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" /> Download Image
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GenerateImages;


