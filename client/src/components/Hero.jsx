import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:p-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      {/* Heading + Sub */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold text-slate-900 dark:text-zinc-100 mx-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-indigo-600 dark:text-indigo-400">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-slate-600 dark:text-zinc-400 font-medium">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          Start creating now
        </button>
        <button className="bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700 font-bold px-10 py-3.5 rounded-xl hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch demo
        </button>
      </div>

      {/* Trusted Section */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-slate-600 dark:text-zinc-400 text-sm font-semibold">
        <img src={assets.user_group} alt="users" className="h-8" /> Trusted by
        10k+ creators
      </div>


      {/* Logos Marquee */}
      <div className="overflow-hidden mt-16 w-full flex justify-center">
        <div className="w-full max-w-5xl">
          {" "}
          {/* constrain width */}
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            <img
              src={assets.facebook}
              alt="Facebook"
              className="h-8 inline-block"
            />
            <img src={assets.slack} alt="Slack" className="h-8 inline-block" />
            <img
              src={assets.framer}
              alt="Framer"
              className="h-8 inline-block"
            />
            <img
              src={assets.netflix}
              alt="Netflix"
              className="h-8 inline-block"
            />
            <img
              src={assets.google}
              alt="Google"
              className="h-8 inline-block"
            />
            <img
              src={assets.linkedin}
              alt="LinkedIn"
              className="h-8 inline-block"
            />

            {/* Duplicate for seamless loop */}
            <img
              src={assets.facebook}
              alt="Facebook"
              className="h-8 inline-block"
            />
            <img src={assets.slack} alt="Slack" className="h-8 inline-block" />
            <img
              src={assets.framer}
              alt="Framer"
              className="h-8 inline-block"
            />
            <img
              src={assets.netflix}
              alt="Netflix"
              className="h-8 inline-block"
            />
            <img
              src={assets.google}
              alt="Google"
              className="h-8 inline-block"
            />
            <img
              src={assets.linkedin}
              alt="LinkedIn"
              className="h-8 inline-block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
