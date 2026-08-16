import { assets } from "../assets/assets";
import { Card } from "./ui/Card";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "QuickAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "QuickAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "QuickAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
  ];

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-[42px] font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Loved by Creators
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto font-medium">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {dummyTestimonialData.map((testimonial, index) => (
          <Card
            key={index}
            className="p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
          >
            <div>
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < testimonial.rating
                          ? assets.star_icon
                          : assets.star_dull_icon
                      }
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
              </div>
              <p className="text-slate-600 dark:text-zinc-300 text-sm my-5 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-4">
              <img
                src={testimonial.image}
                className="w-11 h-11 object-cover rounded-full border border-slate-200 dark:border-zinc-700"
                alt={testimonial.name}
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;

