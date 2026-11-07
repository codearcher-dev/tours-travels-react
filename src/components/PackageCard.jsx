import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";

export default function PackageCard({ pkg }) {
    if (!pkg) return null;

    const slug = pkg.slug || pkg.id || pkg._id;
    const name = pkg.name || "";
    const locationName = pkg.location?.name || pkg.destinations?.[0] || "";
    const nights = pkg.duration?.nights;
    const days = pkg.duration?.days;
    const hasDuration = nights !== undefined && days !== undefined && (nights > 0 || days > 0);
    const actualPrice = Number(pkg.price?.actual || pkg.price?.originalPrice || 0);
    const discountedPrice = Number(pkg.price?.discounted || pkg.price?.discountedPrice || actualPrice);

    const savingsPercent =
        actualPrice > discountedPrice
            ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
            : 0;

    const imgUrl =
        typeof pkg.img === "string"
            ? pkg.img
            : pkg.img?.url ||
              (pkg.images && typeof pkg.images[0] === "string" ? pkg.images[0] : pkg.images?.[0]?.url) ||
              "";

    const travelType = pkg.type || pkg.packageType || "";

    return (
        <article className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5">
            {/* Visual Header / Image Container */}
            <div className="relative w-full aspect-[16/11] overflow-hidden bg-slate-100">
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                        <MapPin size={32} />
                    </div>
                )}

                {/* Soft gradient bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none" />

                {/* Floating Top Header Badges */}
                <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between gap-1.5 pointer-events-none">
                    {hasDuration ? (
                        <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.2 rounded-full shadow-xs border border-white/60">
                            <Clock size={12} className="text-sky-600 shrink-0" />
                            <span>{nights}N / {days}D</span>
                        </span>
                    ) : (
                        <span />
                    )}

                    {savingsPercent > 0 ? (
                        <span className="bg-orange-600 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs">
                            Save {savingsPercent}%
                        </span>
                    ) : travelType ? (
                        <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs truncate max-w-[120px]">
                            {travelType}
                        </span>
                    ) : null}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between text-white pointer-events-none">
                    {locationName ? (
                        <div className="flex items-center gap-1.5 text-xs font-semibold drop-shadow-xs truncate mr-2">
                            <MapPin size={14} className="text-amber-400 shrink-0" />
                            <span className="truncate">{locationName}</span>
                        </div>
                    ) : (
                        <span />
                    )}

                    {pkg.destinations && pkg.destinations.length > 0 && (
                        <span className="text-[10px] sm:text-[11px] text-white/95 bg-black/40 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 rounded-full font-medium shrink-0">
                            {pkg.destinations.length} Stops
                        </span>
                    )}
                </div>
            </div>

            {/* Card Content Body */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3.5 sm:gap-4">
                <div>
                    <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                        {name}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed font-normal">
                        {pkg.description}
                    </p>

                    {/* Destination Highlights Chips */}
                    {pkg.destinations && pkg.destinations.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {pkg.destinations.slice(0, 3).map((item, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] sm:text-[11px] bg-slate-50 text-slate-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg font-medium border border-slate-200">
                                    {item}
                                </span>
                            ))}
                            {pkg.destinations.length > 3 && (
                                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium self-center pl-0.5">
                                    +{pkg.destinations.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Price & Action Row */}
                <div className="pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold truncate">
                            Starting From
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                            <span className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                ₹{discountedPrice.toLocaleString()}
                            </span>
                            {actualPrice > discountedPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                    ₹{actualPrice.toLocaleString()}
                                </span>
                            )}
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">/ person</span>
                        </div>
                    </div>

                    <Link
                        to={`/package/${slug}`}
                        className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-colors shrink-0 shadow-xs group/btn"
                        aria-label={`View details for ${name}`}>
                        <span>Explore</span>
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
