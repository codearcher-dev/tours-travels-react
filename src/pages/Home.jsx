import { Link } from "react-router-dom";
import DestinationChip from "../components/DestinationChip";
import PackageCard from "../components/PackageCard";
import { usePackages } from "../context/PackageContext";
import coverImage from "../assets/package-cover.png";
import StrokeText from "../components/ui/animations/StrokeText";
import TextType from "../components/ui/animations/TextType";
import BounceCards from "../components/ui/animations/BounceCards";
import SkeletonPackageCard from "../components/ui/loading-state/SkeletonPackageCard";

const testimonials = [
    {
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        name: "Ananya Sharma",
        trip: "Kyoto in Bloom",
        quote: "The Kyoto itinerary felt hand-written for us — not a single wasted afternoon, and the machiya stay was the highlight of the year.",
    },
    {
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
        name: "Rohan Kapoor",
        trip: "Andes Explorer",
        quote: "Enquiry to boarding pass took four days. Every hotel matched the photos, every guide showed up early.",
    },
    {
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        name: "Priya Mehta",
        trip: "Sunset Escape",
        quote: "Booked the Santorini escape for our anniversary. The catamaran sunset sail alone was worth the trip.",
    },
];

const steps = [
    { num: "01", title: "Pick a coordinate", desc: "Browse packages by destination, budget or trip length." },
    { num: "02", title: "Customize the route", desc: "Adjust nights, add excursions, or tell us what to remove." },
    { num: "03", title: "Send an enquiry", desc: "Our travel desk replies within a working day with a quote." },
    { num: "04", title: "Collect the stamp", desc: "We handle logistics — you just show up with a passport." },
];

const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1, transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.025 } },
    out: { opacity: 0, transition: { duration: 0.125 } },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } },
};

const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } },
};

const images = [
    "https://picsum.photos/400/400?grayscale",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
    "https://picsum.photos/700/700?grayscale",
    "https://picsum.photos/300/300?grayscale",
];
const transformStyles = [
    "rotate(10deg) translate(-180px)",
    "rotate(5deg) translate(-90px)",
    "rotate(0deg)",
    "rotate(-5deg)translate(90px)",
    "rotate(-10deg) translate(180px)",
];

function PackageErrorState({ error, loading, retry }) {
    return (
        <div className="w-full border border-rust/30 bg-white px-6 py-8 md:px-10 md:py-10 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 text-red-500">
                <span className="font-display text-xl" aria-hidden="true">
                    !
                </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-2">Unable to load packages</p>
            <h3 className="font-display text-2xl text-ink mb-2">The departure board is taking a pause.</h3>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-500">{error}</p>
            <button type="button" onClick={retry} disabled={loading} className="btn btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-50">
                {loading ? "Retrying..." : "Try again"}
            </button>
        </div>
    );
}

export default function Home() {
    const { packages, loading, error, retry } = usePackages();

    return (
        <main className="select-none">
            {/* HERO SECTION - IMMERSIVE FULL BLEED */}
            <section className="relative w-full h-screen min-h-[700px] flex pt-16 justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full">
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                        {/* Gradient overlay for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 mix-blend-multiply"></div>
                    </div>
                </div>

                <div className="relative z-10 text-center px-6 mx-auto mt-8">
                    <h1 data-aos="fade-up" data-aos-delay="100" className="font-display text-white drop-shadow-lg">
                        {/* <StrokeText
                            text="Find your best journey."
                            strokeColor="#F8FAFC"
                            fillColor="#F8FAFC"
                            className="text-sm"
                            strokeWidth={1.4}
                            drawDuration={1.6}
                            fillDelay={0.2}
                            stagger={0.05}
                            ease="power2.out"
                            trigger="mount"
                            fillMode="wipe"
                            fontSize={45}
                            fontWeight={400}
                            letterSpacing={-2}
                            reverse={false}
                        />
                        <br /> */}
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90 font-light flex flex-col">
                            <span className="text-paper-dim">Explore the beauty of </span>
                            <TextType
                                text={["Darjeeling", "North Sikkim", "Kalimpong", "Mirik"]}
                                className="text-yellow-500 italic"
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor
                                cursorCharacter="_"
                                texts={["Welcome to React Bits! Good to see you!", "Build some amazing experiences!"]}
                                deletingSpeed={50}
                                cursorBlinkDuration={0.5}
                            />
                        </div>
                    </h1>

                    <div data-aos="fade-up" data-aos-delay="200" className="flex gap-4 justify-center">
                        <BounceCards images={images} enableHover={true} transformStyles={transformStyles} />
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200" className="flex gap-4 justify-center">
                        <Link
                            className="px-2 md:px-4 lg:px-8 py-4 bg-white text-ink text-xs md:text-sm font-medium tracking-wide uppercase hover:bg-zinc-200 transition-colors"
                            to="/packages">
                            Explore Destinations
                        </Link>
                        <Link
                            className="px-2 md:px-4 lg:px-8 py-4 bg-transparent border border-white text-white text-xs md:text-sm font-medium tracking-wide uppercase hover:bg-white hover:text-ink transition-colors"
                            to="/contact">
                            Plan A Custom Route
                        </Link>
                    </div>
                </div>
            </section>

            {/* TOP DESTINATIONS (Sleek Horizontal Gallery) */}
            <section className="max-w-[1400px] mx-auto pt-12 md:pt-20 pb-8 px-4 md:px-8 overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                    <div className="max-w-xl" data-aos="fade-right">
                        <h2 className="font-display text-4xl md:text-5xl font-medium mb-4">Trending Coordinates</h2>
                        <p className="text-zinc-500 font-sans leading-relaxed">
                            Discover our most sought-after locations this season. Hand-picked stays and exclusive experiences await.
                        </p>
                    </div>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                    {error ? (
                        <PackageErrorState error={error} loading={loading} retry={retry} />
                    ) : loading ? (
                        Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="h-[400px] w-[280px] md:w-[350px] shrink-0 animate-pulse bg-white/60">
                                    <div className="h-full w-full bg-zinc-200/70" />
                                </div>
                            ))
                    ) : (
                        packages.map((p, i) => (
                            <div data-aos="fade-left" key={p._id || i} className="snap-start shrink-0 w-[280px] md:w-[350px]">
                                <DestinationChip dest={{ name: p.location.name, img: p.img, desc: p.description }} />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* BEST SELLING PACKAGES */}
            <section className="bg-paper-dim py-12 md:py-20 px-4 md:px-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-8" data-aos="fade-up">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-4 block">Curated For You</span>
                        <h2 className="font-display text-4xl md:text-5xl font-medium">Signature Journeys</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {error ? (
                            <div className="col-span-full">
                                <PackageErrorState error={error} loading={loading} retry={retry} />
                            </div>
                        ) : loading ? (
                            Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <div data-aos="fade-up" key={i}>
                                        <SkeletonPackageCard />
                                    </div>
                                ))
                        ) : (
                            packages.slice(0, 3).map((p, i) => (
                                <div data-aos="fade-up" key={p._id || i}>
                                    <PackageCard pkg={p} />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase font-semibold tracking-widest transition-colors hover:text-rust border-b border-ink pb-1 hover:border-rust"
                            to="/packages">
                            View All Journeys
                        </Link>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS - Minimalist Timeline */}
            <section className="max-w-[1200px] mx-auto py-12 md:py-20 px-4 md:px-8">
                <div className="mb-10 text-center max-w-2xl mx-auto" data-aos="fade-up">
                    <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">The Process</h2>
                    <p className="text-zinc-500 font-sans leading-relaxed">
                        From your first spark of inspiration to your final flight home, we handle the complexities so you can focus on the experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Horizontal connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-zinc-200"></div>

                    {steps.map((s, i) => (
                        <div
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="relative flex flex-col items-center text-center group"
                            key={s.num}>
                            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-full flex items-center justify-center font-mono text-xs text-zinc-400 mb-8 relative z-10 group-hover:border-rust group-hover:text-rust transition-colors duration-500">
                                {s.num}
                            </div>
                            <h4 className="font-display text-xl mb-3">{s.title}</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed font-sans">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-paper-dim py-12 md:py-20 overflow-hidden px-4 md:px-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-8" data-aos="fade-up">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-4 block">From The Field</span>
                        <h2 className="font-display text-4xl md:text-5xl font-medium">Traveler Stories</h2>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
                        {testimonials.map((t, i) => (
                            <div
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                className="snap-start shrink-0 w-[300px] md:w-[400px] bg-paper border border-zinc-100 p-8 md:p-10 shadow-sm flex flex-col"
                                key={t.name}>
                                <div className="text-gold/30 mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                <p className="text-base leading-[1.7] font-sans font-light mb-10 text-ink-soft flex-grow">"{t.quote}"</p>
                                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale opacity-90" />
                                    <div>
                                        <div className="text-sm font-medium font-sans text-ink">{t.name}</div>
                                        <div className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase mt-1">{t.trip}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="max-w-[1200px] mx-auto py-12 md:py-20 px-4 md:px-8 text-center">
                <h2 data-aos="fade-up" className="font-display text-4xl sm:text-5xl md:text-7xl font-medium max-w-4xl mx-auto leading-tight mb-10">
                    Ready for takeoff? <br />
                    <span className="italic text-zinc-400">Tell us your dream coordinates.</span>
                </h2>
                <div data-aos="fade-up" data-aos-delay="100">
                    <Link
                        className="inline-block px-10 py-5 bg-ink text-white font-mono text-sm uppercase tracking-widest hover:bg-rust transition-colors duration-300"
                        to="/contact">
                        Start an Enquiry
                    </Link>
                </div>
            </section>
        </main>
    );
}
