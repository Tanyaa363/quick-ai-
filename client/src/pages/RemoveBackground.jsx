import { useState } from "react";
import { Eraser, Sparkles, Upload, Download } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Background removed successfully!");
      } else {
        toast.error(data.message);
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
      link.download = `QuickAI-no-bg-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded successfully!");
    } catch (err) {
      window.open(content, "_blank");
    }
    setIsDownloading(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          AI Background Remover
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 mt-1">
          Isolate subjects and erase backgrounds automatically with high precision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Upload Form */}
        <Card className="lg:col-span-5 p-6">
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Upload Image
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Select Local File
              </label>
              <input
                onChange={(e) => setInput(e.target.files[0])}
                type="file"
                accept="image/*"
                className="w-full p-3 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-zinc-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-500 file:text-white hover:file:bg-rose-600 cursor-pointer"
                required
              />
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Supports JPG, PNG, WEBP files up to 10MB.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full bg-rose-600 hover:bg-rose-500 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-bold"
            >
              <Eraser className="w-4 h-4" /> Remove Background
            </Button>
          </form>
        </Card>

        {/* Right Column: Output Asset */}
        <Card className="lg:col-span-7 p-6 min-h-[480px] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                <Eraser className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Processed Result
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4 flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Skeleton className="w-full h-80 rounded-2xl" />
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                Erasing image background...
              </p>
            </div>
          ) : !content ? (
            <EmptyState
              icon={Eraser}
              title="Canvas Ready"
              description="Upload an image on the left and click 'Remove Background' to view results."
              className="flex-1 border-none bg-transparent"
            />
          ) : (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 p-2 shadow-sm">
                <img
                  src={content}
                  alt="Processed image result"
                  className="w-full h-auto max-h-[420px] rounded-xl object-contain mx-auto"
                />
              </div>

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

export default RemoveBackground;

