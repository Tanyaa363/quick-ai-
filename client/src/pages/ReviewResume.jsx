import { useState } from "react";
import { FileText, Sparkles, Wand2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Please upload a PDF resume file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
        toast.success("Resume analysis complete!");
      } else {
        toast.error(data.message);
        if (data.isLimitReached) {
          setTimeout(() => navigate("/ai/pricing"), 1500);
        }
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
          AI Resume Reviewer
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 mt-1">
          Upload your resume PDF to receive instant ATS scoring, bullet improvements, and actionable feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form */}
        <Card className="lg:col-span-5 p-6">
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Upload Resume
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Select PDF File
              </label>
              <input
                onChange={(e) => setInput(e.target.files[0])}
                type="file"
                accept="application/pdf"
                className="w-full p-3 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-zinc-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-500 cursor-pointer"
                required
              />
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Upload a standard PDF resume document.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold"
            >
              <FileText className="w-4 h-4" /> Review Resume
            </Button>
          </form>
        </Card>

        {/* Right Column: Output */}
        <Card className="lg:col-span-7 p-6 min-h-[480px] flex flex-col justify-between">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800 mb-4">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
              ATS Feedback & Analysis
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
              icon={FileText}
              title="Review Studio Ready"
              description="Upload your resume PDF on the left and click 'Review Resume' for instant feedback."
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

export default ReviewResume;

