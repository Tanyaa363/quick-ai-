import { useState } from "react";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for testing and casual content creation.",
    monthlyPrice: 0,
    annualPrice: 0,
    isFeatured: false,
    icon: Sparkles,
    features: [
      "10 AI Generations per month",
      "Standard processing speed",
      "AI Article Writer (Short)",
      "Blog Title Generator",
      "Community showcase access",
    ],
    cta: "Current Plan",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals needing unlimited AI power and image generation.",
    monthlyPrice: 19,
    annualPrice: 15,
    isFeatured: true,
    badge: "Most Popular",
    icon: Zap,
    features: [
      "Unlimited AI Generations",
      "High-Res Image Generation",
      "Background & Object Removal",
      "AI Resume Reviewer",
      "Long-Form Article Writer (1600+ words)",
      "Priority 24/7 Processing Speed",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom AI workflows and dedicated support for teams.",
    monthlyPrice: 49,
    annualPrice: 39,
    isFeatured: false,
    icon: Shield,
    features: [
      "Everything in Pro",
      "Dedicated Team Workspaces",
      "Custom Model Fine-tuning",
      "API Access & Webhooks",
      "Dedicated Account Manager",
      "99.9% Uptime SLA",
    ],
    cta: "Contact Enterprise",
  },
];

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const { getToken } = useAuth();

  const handleCheckout = async (planId) => {
    if (planId === "starter") return;
    try {
      setLoadingPlan(planId);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/create-checkout-session",
        { planId, billingInterval: isAnnual ? "annual" : "monthly" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success && data.url) {
        toast.success(data.message || "Redirecting to checkout...");
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to initiate checkout.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setLoadingPlan(null);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="primary" className="px-3 py-1">
          Simple & Transparent Pricing
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Supercharge Your Workflow with QuickAI
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
          Choose the perfect plan for your content needs. Upgrade or downgrade anytime.
        </p>

        {/* Billing Switch */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <span
            className={`text-xs font-semibold ${
              !isAnnual ? "text-slate-900 dark:text-zinc-100" : "text-slate-500 dark:text-zinc-400"
            }`}
          >
            Monthly Billing
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle Annual Billing"
            className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-zinc-800 p-1 transition-colors focus:outline-none"
          >
            <div
              className={`w-4 h-4 rounded-full bg-indigo-600 transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-semibold ${
                isAnnual ? "text-slate-900 dark:text-zinc-100" : "text-slate-500 dark:text-zinc-400"
              }`}
            >
              Annual Billing
            </span>
            <Badge variant="success" className="text-[10px] uppercase font-bold">
              20% OFF
            </Badge>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const Icon = plan.icon;

          return (
            <Card
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                plan.isFeatured
                  ? "border-2 border-indigo-500 dark:border-indigo-500 bg-white dark:bg-zinc-900 shadow-xl scale-105 z-10"
                  : "border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" className="bg-indigo-600 text-white font-bold px-3 py-1 shadow-md border-none">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-zinc-100">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 min-h-[32px]">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-zinc-100">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    / month {isAnnual && price > 0 ? "(billed annually)" : ""}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
                    Included Features:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300 font-medium">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => handleCheckout(plan.id)}
                  isLoading={loadingPlan === plan.id}
                  variant={plan.isFeatured ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
