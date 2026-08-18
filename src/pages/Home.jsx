import { useRef } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import destinations from "../data/destinations";
// import packages from "../data/packages";
import DestinationChip from "../components/DestinationChip";
import PackageCard from "../components/PackageCard";
import SkeletonPackageCard from "../components/ui/loading-state/SkeletonPackageCard";
import { usePackages } from "../context/PackageContext";
import coverImage from "../assets/package-cover.png";

const testimonials = [
    {
        initials: "AS",
        name: "Ananya Sharma",
        trip: "Kyoto in Bloom, Mar 2026",
        quote: "The Kyoto itinerary felt hand-written for us — not a single wasted afternoon, and the machiya stay was the highlight of the year.",
    },
    {
        initials: "RK",
        name: "Rohan Kapoor",
        trip: "Andes Explorer, Jan 2026",
        quote: "Enquiry to boarding pass took four days. Every hotel matched the photos, every guide showed up early.",
    },
    {
        initials: "PM",
        name: "Priya Mehta",
        trip: "Sunset Escape, Feb 2026",
        quote: "Booked the Santorini escape for our anniversary. The catamaran sunset sail alone was worth the trip.",
    },
];

const steps = [
    { num: "01", title: "Pick a coordinate", desc: "Browse packages by destination, budget or trip length." },
    { num: "02", title: "Customize the route", desc: "Adjust nights, add excursions, or tell us what to remove." },
    { num: "03", title: "Send an enquiry", desc: "Our travel desk replies within a working day with a quote." },
    { num: "04", title: "Collect the stamp", desc: "We handle logistics — you just show up with a passport." },
];

export default function Home() {
    const { packages, loading } = usePackages();
    const containerRef = useRef(null);
    useScrollReveal(containerRef, [loading, packages]);

    return (
        <main ref={containerRef} className="page-fade">
            <div
                className="w-full max-h-screen h-[700px]"
                style={{
                    backgroundImage: `url(${coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}>
                <section className="max-w-[1200px] mx-auto pt-8 px-8 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
                    <div>
                        <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal-900 px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-rust"></span>
                            <span className="text-[#F5F3EC]">BOARDING PASS TO ADVENTURE</span>
                        </span>
                        <h1 className="font-display text-[#f5f3ec] text-[clamp(30px,5.4vw,68px)] font-medium leading-[1.04] tracking-[-0.01em] ">
                            Every journey
                            <br />
                            has a line.
                            <br />
                            <em className="italic font-normal text-[#d8af31]">This one's yours.</em>
                        </h1>
                        <p className="mt-6 text-[clamp(12px, 5.4vh, 17px)] text-[#ecebe5] max-w-[460px] leading-[1.65]">
                            Hand-plotted itineraries across 40+ destinations — from Bali's rice terraces to Iceland's ring road. We chart the route,
                            you collect the stamps.
                        </p>
                        <div className="flex gap-4 mt-9">
                            <Link className="btn btn-primary rounded-sm px-[22px] py-[12px]" to="/packages">
                                Browse Packages
                            </Link>
                            <Link className="btn btn-secondary rounded-sm px-[22px] py-[12px]" to="/contact">
                                Plan a Trip
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-ink text-paper rounded-md relative overflow-hidden shadow-[0_30px_60px_rgba(18,35,46,0.28)] rotate-2 floaty">
                            <div className="pt-[26px] px-[28px] pb-5 flex justify-between items-start">
                                <div>
                                    <div className="text-[22px] font-semibold">
                                        NJP <span className="text-gold mx-2">✈</span>NORTH SIKKIM
                                    </div>
                                    <div className="text-[11px] opacity-60 mt-1.5 uppercase">NJP — North Sikkim</div>
                                </div>
                                <span className="bg-gold text-ink text-[11px] font-bold py-1 px-2.5 rounded-[20px] uppercase">Best Seller</span>
                            </div>
                            <div className="flex gap-0 justify-between px-[28px] pb-[22px] text-[10px] opacity-60 uppercase">
                                <div>
                                    Departs<strong> 5 Sept</strong>
                                </div>
                                <div>
                                    Duration<strong> 4 Days</strong>
                                </div>
                                <div>
                                    <strong> Prime Traveller</strong>
                                </div>
                            </div>
                            <div className="ticket-barcode mx-[28px] mb-[26px]"></div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="path-divider max-w-[1200px] mx-auto pt-10 px-8">
                <svg viewBox="0 0 1136 60" preserveAspectRatio="none">
                    <path d="M0,10 C 250,60 350,0 568,30 C 780,58 900,5 1136,40" />
                </svg>
            </div>

            <section className="max-w-[1200px] mx-auto py-[70px] px-8">
                <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
                    <div>
                        <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                            PLOTTED DESTINATIONS
                        </span>
                        <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">Top Destinations</h2>
                    </div>
                </div>
                <div className="flex gap-[18px] overflow-x-auto pb-2.5 scrollbar-thin">
                    {packages.map((p, i) => (
                        <DestinationChip
                            key={i}
                            dest={{ name: p.location.name, img: p.img, desc: p.description }}
                            revealDelay={`${Math.min(i * 0.08, 1.2)}s`}
                        />
                    ))}
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 0 }}>
                <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
                    <div>
                        <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                            FEATURED PACKAGES
                        </span>
                        <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">Best Selling Packages</h2>
                    </div>
                    <Link
                        className="inline-flex items-center gap-2 font-mono text-[13px] uppercase font-semibold pb-1 tracking-[0.05em] transition-[transform,box-shadow,background] duration-250 border-b border-ink active:translate-y-0 active:scale-95"
                        to="/packages">
                        View All Packages →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {!loading && packages.slice(0, 3).map((p, i) => <PackageCard key={i} pkg={p} revealDelay={`${Math.min(i * 0.08, 1.2)}s`} />)}
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 0 }}>
                <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
                    <div>
                        <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                            HOW IT WORKS
                        </span>
                        <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">Four stops to takeoff</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-line">
                    {steps.map((s, i) => (
                        <div
                            className="pt-8 lg:px-6 lg:border-r border-line md:border-b-0 border-b pb-6 lg:pb-0 last:border-r-0 last:border-b-0 reveal"
                            style={{ "--reveal-delay": `${Math.min(i * 0.08, 1.2)}s` }}
                            key={s.num}>
                            <div className="font-display italic text-[34px] text-gold-deep mb-3.5">{s.num}</div>
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 0 }}>
                <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
                    <div>
                        <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                            FROM THE FIELD
                        </span>
                        <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">Postcards from travelers</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {testimonials.map((t, i) => (
                        <div className="testimonial-card reveal" style={{ "--reveal-delay": `${Math.min(i * 0.08, 1.2)}s` }} key={t.initials}>
                            <div className="testimonial-card-shell">
                                <span className="font-display text-[44px] text-gold-deep italic leading-[0.5] mb-2.5 block">"</span>
                                <p>{t.quote}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-[38px] h-[38px] rounded-full bg-teal text-white flex items-center justify-center text-[13px] font-semibold font-mono">
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div className="text-[13.5px] font-semibold">{t.name}</div>
                                        <div className="text-[11.5px] text-ink-soft">{t.trip}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 10 }}>
                <div className="bg-ink text-paper rounded-md mx-8 lg:mx-auto max-w-[1136px] py-[56px] px-[48px] flex flex-col md:flex-row justify-between items-center md:text-left text-center gap-8 relative overflow-hidden before:content-[''] before:absolute before:-right-[60px] before:-top-[60px] before:w-[220px] before:h-[220px] before:rounded-full before:border before:border-dashed before:border-[rgba(232,163,61,0.4)] reveal">
                    <h2 className="font-display text-[clamp(26px,3vw,36px)] font-medium max-w-[480px] relative">
                        Ready for <em className="italic font-normal text-yellow-500/90">takeoff?</em> Tell us your dream coordinates.
                    </h2>
                    <Link className="btn btn-primary rounded-sm px-[22px] py-[12px]" to="/contact">
                        Start an Enquiry
                    </Link>
                </div>
            </section>
        </main>
    );
}
