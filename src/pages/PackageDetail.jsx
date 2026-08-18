import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { usePackages } from "../context/PackageContext";
import Timeline from "../components/Itinerary";
import { MapPin } from "lucide-react";

export default function PackageDetail() {
    const { packages } = usePackages();
    const { slug } = useParams();
    const pkg = packages.find((p) => p.slug === slug);
    const containerRef = useRef(null);
    useScrollReveal(containerRef);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!pkg) {
        return (
            <main className="page-fade min-h-[60vh] flex flex-col items-center justify-center px-8">
                <h1 className="font-display text-4xl mb-4">Package not found</h1>
                <p className="text-ink-soft mb-8">The route you're looking for doesn't exist.</p>
                <Link to="/packages" className="btn btn-primary px-[32px] py-[16px]">
                    Back to Packages
                </Link>
            </main>
        );
    }

    const images = pkg.images || [pkg.img];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <main ref={containerRef} className="page-fade">
            {/* Hero Image Carousel */}
            <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden bg-ink group">
                <div
                    className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                    {images.map((img, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <img src={img} alt={`${pkg.name} - ${idx + 1}`} className="w-full h-full object-cover opacity-60" />
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
                            aria-label="Previous image">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
                            aria-label="Next image">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"}`}
                                    aria-label={`Go to image ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row lg:gap-10">
                <div className="w-full px-8 pt-12 lg:pt-16">
                    <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em] reveal">
                        <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> {pkg.location.name}
                    </span>

                    <h1
                        className="font-display text-[clamp(40px,5vw,64px)] text-ink-soft font-medium leading-[1.05] tracking-[-0.01em] mb-8 reveal"
                        style={{ "--reveal-delay": "0.08s" }}>
                        {pkg.name}
                    </h1>

                    <div className=" text-ink-soft leading-[1.7] max-w-[640px] reveal mb-16" style={{ "--reveal-delay": "0.24s" }}>
                        <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Overview</div>
                        <p>{pkg.description}</p>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12 border-y border-line py-8 mb-12 reveal"
                        style={{ "--reveal-delay": "0.16s" }}>
                        <div>
                            <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Duration</div>
                            <div className="text-[17px] font-medium text-ink-soft">
                                {pkg.duration.days} Days {pkg.duration.nights} Nights
                            </div>
                        </div>
                        <div>
                            <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Starting From</div>
                            <div className="flex gap-4 items-center">
                                <strong className="block text-[20px] text-green-600 font-mono font-semibold normal-case mt-0.5">
                                    ₹ {pkg.price.discounted.toLocaleString()}
                                </strong>
                                <span className="block text-[15px] text-red-600 font-mono font-light normal-case mt-0.5 line-through">
                                    ₹ {pkg.price.actual}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Explore</div>
                            <button className="text-[17px] font-medium btn-primary transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 rounded-sm px-4 py-1">
                                <a href={pkg.location.url} target="blank" className="flex items-center justify-center gap-2 font-mono">
                                    <MapPin className="w-5 h-5 " />
                                    Map
                                </a>
                            </button>
                        </div>
                    </div>

                    <div className=" text-ink-soft leading-[1.7] max-w-[640px] reveal mb-16" style={{ "--reveal-delay": "0.24s" }}>
                        <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Places</div>
                        <ul className="list-disc pl-4">
                            {pkg.destinations.map((dest, index) => (
                                <li key={index}>{dest}</li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className="flex flex-col text-ink-soft sm:flex-row  gap-8 sm:gap-12 border-y border-line py-8 reveal"
                        style={{ "--reveal-delay": "0.32s" }}>
                        <div>
                            <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Included</div>
                            <div className="">
                                <ul className="list-disc pl-4">
                                    {pkg.inclusions.map((inc, index) => (
                                        <li key={index}>{inc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="text-[14px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Excluded</div>
                            <div className="">
                                <ul className="list-disc pl-4">
                                    {pkg.exclusions.map((exc, index) => (
                                        <li key={index}>{exc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Timeline itinerary={pkg.itinerary} className="reveal" style={{ "--reveal-delay": "0.08" }} />
            </div>
            <div className="reveal flex justify-center lg:justify-start gap-4 m-8" style={{ "--reveal-delay": "0.40s" }}>
                <Link to="/contact" className="btn btn-primary px-[32px] py-[16px]">
                    Enquire Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </Link>
                <Link to="/packages" className="btn btn-secondary px-[32px] py-[16px]">
                    All Packages
                </Link>
            </div>
        </main>
    );
}
