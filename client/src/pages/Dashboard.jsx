import { useEffect, useState } from "react";
import { Gem, Sparkles, Plus } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import CreationItem from "../components/CreationItem";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CreationSkeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Overview
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 mt-1">
            Monitor your AI activity and generated assets.
          </p>
        </div>

        <Button
          onClick={() => navigate("/ai/write-article")}
          variant="primary"
          size="md"
        >
          <Plus className="w-4 h-4" /> Create New
        </Button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5 flex items-center justify-between border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Total Creations
            </p>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
              {creations.length}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Account Status
            </p>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
              Unlimited Access
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <Gem className="w-6 h-6" />
          </div>
        </Card>

      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
          Recent Creations
        </h2>

        {loading ? (
          <div className="space-y-3">
            <CreationSkeleton />
            <CreationSkeleton />
            <CreationSkeleton />
          </div>
        ) : creations.length === 0 ? (
          <EmptyState
            title="No creations generated yet"
            description="Start generating high-impact articles, blog titles, or images using QuickAI."
            actionLabel="Explore AI Tools"
            onAction={() => navigate("/ai/write-article")}
          />
        ) : (
          <div className="space-y-3">
            {creations.map((item) => (
              <CreationItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


