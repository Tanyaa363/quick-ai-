import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import { Card } from "./ui/Card";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-[42px] font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Powerful AI Tools
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto font-medium">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {AiToolsData.map((tool, index) => (
          <Card
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
          >
            <div>
              <tool.Icon
                className="w-12 h-12 p-3 text-white rounded-2xl shadow-md"
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              />
              <h3 className="mt-6 mb-2 text-xl font-bold text-slate-900 dark:text-zinc-100">
                {tool.title}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
