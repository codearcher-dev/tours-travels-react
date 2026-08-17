import { Link } from "react-router-dom";

export default function PackageCard({ pkg, revealDelay = "0s" }) {
    return (
        <article className="package-card reveal group" style={{ "--reveal-delay": revealDelay }}>
            <div className="package-card-shell">
                <div className="h-48 relative overflow-hidden">
                    <img src={pkg.img} alt={pkg.name} className="package-card-image" />
                    <span className="absolute top-3.5 right-3.5 w-16 h-16 rounded-full border-[1.5px] border-dashed border-[rgba(247,244,238,0.9)] bg-[rgba(18,35,46,0.55)] backdrop-blur-[3px] text-white flex items-center justify-center text-center text-[9px] uppercase font-bold leading-[1.3] rotate-[-10deg]">
                        {pkg.duration.days} Days
                        <br />
                        {pkg.duration.nights} Nights
                    </span>
                </div>
                <div className="p-[20px_22px_24px]">
                    {/* <div className="font-mono text-[10.5px] text-teal-deep mb-2 uppercase">{pkg.coord}</div> */}
                    <h3 className="font-display text-[20px] font-medium mb-2">{pkg.name}</h3>
                    <p className="text-[13.5px] text-ink-soft leading-[1.55] mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="flex justify-between items-center border-t border-dashed border-line pt-3.5">
                        <div className="font-mono text-[11px] text-ink-soft uppercase">
                            <span className="font-display text-[15px] normal-case">Starting From</span>
                            <div className="flex gap-4 items-center">
                                <span className="block text-[15px] text-ink font-mono font-light normal-case mt-0.5 line-through">
                                    ₹ {pkg.price.actual}
                                </span>
                                <strong className="block text-[20px] text-ink font-mono font-semibold normal-case mt-0.5">
                                    ₹ {pkg.price.discounted.toLocaleString()}
                                </strong>
                            </div>
                        </div>
                        <Link
                            to={`/package/${pkg._id}`}
                            className="font-mono text-[12px] uppercase font-semibold text-teal-deep flex items-center gap-1.5">
                            Details
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-3.25 h-3.25 transition-transform duration-250 ease-out group-hover:translate-x-1">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
