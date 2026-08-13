import { Link } from "react-router-dom";

export default function PackageCard({ pkg, revealDelay = "" }) {
    return (
        <article
            className={`bg-white border border-line rounded-[3px] overflow-hidden transition-[transform,box-shadow,border-color] duration-350 ease-out relative hover:-translate-y-[6px] hover:-rotate-[0.4deg] hover:shadow-[0_24px_40px_rgba(18,35,46,0.14)] hover:border-transparent group reveal ${revealDelay}`}>
            <div className="h-[190px] relative overflow-hidden">
                <img
                    src={pkg.img}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute top-3.5 right-3.5 w-16 h-16 rounded-full border-[1.5px] border-dashed border-[rgba(247,244,238,0.9)] bg-[rgba(18,35,46,0.55)] backdrop-blur-[3px] text-white flex items-center justify-center text-center text-[9px] uppercase font-bold leading-[1.3] rotate-[-10deg]">
                    {pkg.days}
                    <br />
                    DAYS
                </span>
            </div>
            <div className="p-[20px_22px_24px]">
                <div className="font-mono text-[10.5px] text-teal-deep mb-2 uppercase">{pkg.coord}</div>
                <h3 className="font-display text-[20px] font-medium mb-2">{pkg.name}</h3>
                <p className="text-[13.5px] text-ink-soft leading-[1.55] mb-4">{pkg.desc}</p>
                <div className="flex justify-between items-center border-t border-dashed border-line pt-[14px]">
                    <div className="font-mono text-[11px] text-ink-soft uppercase">
                        From
                        <strong className="block text-[19px] text-ink font-display font-semibold normal-case mt-0.5">{pkg.price}</strong>
                    </div>
                    <Link
                        to={`/package/${pkg.id}`}
                        className="font-mono text-[12px] uppercase font-semibold text-teal-deep flex items-center gap-1.5">
                        Details
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-[13px] h-[13px] transition-transform duration-250 ease-out group-hover:translate-x-1">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
