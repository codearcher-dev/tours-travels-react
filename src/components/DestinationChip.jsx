import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

export default function DestinationChip({ dest }) {
    const imgUrl =
        dest?.images?.[0]?.url ||
        (typeof dest?.images?.[0] === "string" ? dest?.images?.[0] : null) ||
        (typeof dest?.img === "string" ? dest?.img : dest?.img?.url) ||
        "";
    const [imgError, setImgError] = useState(!imgUrl);
    const name = dest?.name || "";
    const coord = dest?.coord || "";
    const toursCount = dest?.toursCount;
    const tagline = dest?.tagline || dest?.desc || "";

    return (
        <Link
            to={`/packages?dest=${encodeURIComponent(name)}`}
            className="group relative block w-full h-[320px] xs:h-[350px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 bg-slate-900">
            {/* Background Image / Placeholder */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                {imgUrl && !imgError ? (
                    <img
                        src={imgUrl}
                        alt={name}
                        loading="lazy"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-95"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-sky-950 flex items-center justify-center">
                        <Compass className="text-slate-700/50 w-24 h-24" />
                    </div>
                )}
            </div>

            {/* Gradient Overlay for high-end readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between gap-1.5 pointer-events-none">
                {toursCount ? (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                        <Compass size={13} className="text-amber-400 shrink-0" />
                        <span>{toursCount}+ Tours</span>
                    </span>
                ) : (
                    <span />
                )}
                {coord && (
                    <span className="text-[10px] sm:text-[11px] text-white/80 font-medium tracking-wider bg-black/30 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10 truncate max-w-[140px]">
                        {coord}
                    </span>
                )}
            </div>

            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 flex flex-col justify-end">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">Featured Region</span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2 drop-shadow-xs group-hover:text-amber-300 transition-colors">
                    {name}
                </h3>
                {tagline && <p className="text-xs text-white/85 line-clamp-2 font-normal leading-relaxed mb-3 sm:mb-4">{tagline}</p>}

                <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    <span>View Tour Packages</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
