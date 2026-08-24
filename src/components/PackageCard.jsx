import { Link } from "react-router-dom";

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function PackageCard({ pkg }) {
    return (
        <article className="group block w-full h-[400px] md:h-[500px] relative overflow-hidden">
            <Link to={`/package/${pkg.slug}`} className="absolute inset-0 z-20">
                <span className="sr-only">View Details for {pkg.name}</span>
            </Link>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src={pkg.img.url} alt={pkg.name} className="w-full h-full object-cover" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/20 to-black/80 transition-opacity duration-500 group-hover:opacity-90"></div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8">
                {/* Top: Duration Badge */}
                <div className="flex justify-end">
                    <div className="bg-white text-ink px-5 py-2 rounded-full text-sm font-display font-extrabold tracking-wide shadow-xl transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                        {pkg.duration.days} Days / {pkg.duration.nights} Nights
                    </div>
                </div>

                {/* Bottom: Text & Price */}
                <div className="flex flex-col">
                    <h3 className="font-display text-white text-3xl mb-2 group-hover:-translate-y-2 transition-transform duration-500">{pkg.name}</h3>

                    {/* Expandable description on hover */}
                    <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out mb-4">
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2 font-sans font-light">{pkg.description}</p>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-white/20 group-hover:border-white/40 transition-colors duration-500">
                        <div>
                            <span className="block text-[10px] text-white/60 font-mono uppercase tracking-widest mb-1">Starting From</span>
                            <div className="flex items-center gap-3">
                                <span className="text-white text-xl font-medium tracking-tight">₹{pkg.price.discounted.toLocaleString()}</span>
                                <span className="text-white/40 text-sm line-through">₹{pkg.price.actual}</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-ink transition-all duration-500">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
