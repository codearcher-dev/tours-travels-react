import { Link } from "react-router-dom";
import DestinationChip from "../components/DestinationChip";
import PackageCard from "../components/PackageCard";
import { usePackages } from "../context/PackageContext";
import coverImage from "../assets/home-cover.png";
import StrokeText from "../components/ui/animations/StrokeText";
import TextType from "../components/ui/animations/TextType";
import SkeletonPackageCard from "../components/ui/loading-state/SkeletonPackageCard";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import Verified from "../components/ui/icons/Verified";
import ShinyText from "../components/ui/animations/ShinyText";
import { useEffect, useState } from "react";
import { getFeedbacks } from "../services/feedback.services";
import { countPagevisit } from "../services/initial.services";

const steps = [
    { num: "01", title: "Pick a coordinate", desc: "Browse packages by destination, budget or trip length." },
    { num: "02", title: "Customize the route", desc: "Adjust nights, add excursions, or tell us what to remove." },
    { num: "03", title: "Send an enquiry", desc: "Our travel desk replies within a working day with a quote." },
    { num: "04", title: "Book your slot", desc: "We handle logistics — you just go ahead." },
];

const images = [
    "https://images.unsplash.com/photo-1600402808924-9c591a6dace8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2lra2ltfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1632726823875-43dd9adad495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFNpa2tpbXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fERhcmplZWxpbmd8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1671711847762-b8308b444a42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1671984247482-1acf238bba0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TW91bnRhaW5zfGVufDB8MnwwfHx8MA%3D%3D",
];

const galleryFadeDirections = ["fade-left", "fade-up", "fade-down", "fade-right"];

function PackageErrorState({ error, loading, retry }) {
    return (
        <div className="w-full border border-rust/30 bg-white px-6 py-8 md:px-10 md:py-10 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 text-red-500">
                <span className="text-xl" aria-hidden="true">
                    !
                </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-rust mb-2">Unable to load packages</p>
            <h3 className="text-2xl text-ink mb-2">The departure board is taking a pause.</h3>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-500">{error}</p>
            <button type="button" onClick={retry} disabled={loading} className="btn btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-50">
                {loading ? "Retrying..." : "Try again"}
            </button>
        </div>
    );
}

export default function Home() {
    const { packages, destinations, loading, error, retry } = usePackages();
    const [galleryPhotos, setGalleryPhotos] = useState([]);

    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const getImageDimensions = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        src,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    });
                };
                img.src = src;
            });
        };

        const fetchTestimonials = async () => {
            try {
                const data = await getFeedbacks(3, Math.floor(Math.random() * 10));
                setTestimonials(data.feedbacks.map((f) => ({ name: f.name, trip: f.package, quote: f.review })));
            } catch (error) {
                console.error(error.message);
            }
        };

        const visit = async () => {
            try {
                await countPagevisit();
            } catch (error) {
                console.log(error.message);
            }
        };

        Promise.all(images.map((src) => getImageDimensions(src))).then((data) => {
            setGalleryPhotos(data);
        });

        fetchTestimonials();
        visit();
    }, []);

    return (
        <main className="select-none overflow-x-clip">
            {/* HERO SECTION - IMMERSIVE FULL BLEED */}
            <section className="relative w-full h-screen min-h-[700px] flex pt-16 pb-8 md:pb-0 justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-ink">
                    <div className="w-full h-full">
                        <img src={coverImage} alt="Cover" className="bg-breathe w-full h-full object-cover opacity-70" />
                        {/* Gradient overlay for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 mix-blend-multiply"></div>
                    </div>
                </div>

                <div className="relative z-10 text-center px-6 mx-auto mt-8 flex flex-col gap-4">
                    <h1 data-aos="fade-up" data-aos-delay="100" className="font-display text-white drop-shadow-lg">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90 font-light flex flex-col">
                            <span className="text-paper-dim">Explore the beauty of </span>
                            <TextType
                                text={["Darjeeling", "North Sikkim", "Kalimpong", "Mirik", "Gangtok"]}
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

                    <div className="w-[min(92vw,720px)] mx-auto" aria-label="Featured mountain destinations">
                        <PhotoAlbum
                            layout="columns"
                            photos={galleryPhotos}
                            columns={(containerWidth) => (containerWidth < 480 ? 2 : containerWidth < 768 ? 3 : 2)}
                            spacing={8}
                            componentsProps={{
                                wrapper: ({ index }) => ({
                                    "data-aos": galleryFadeDirections[index % galleryFadeDirections.length],
                                    "data-aos-delay": index * 100,
                                }),
                            }}
                        />
                    </div>

                    <div data-aos="fade-up" className="py-4 flex justify-center items-center gap-2">
                        <Verified stroke={"white"} fill={"#60a5fa"} />
                        <ShinyText
                            text={"VERIFIED BY SIKKIM GOVERNMENT"}
                            color="#bcbcbc"
                            shineColor="#ffffff"
                            className="font-extrabold text-xl font-mono"
                        />
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
                        <h2 className="text-4xl md:text-5xl font-medium mb-4">Trending Coordinates</h2>
                        <p className="text-zinc-500 leading-relaxed">
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
                        destinations.map(
                            (d, i) =>
                                i < 4 && (
                                    <div data-aos="fade-left" key={d._id || i} className="snap-start shrink-0 w-[280px] md:w-[350px]">
                                        <DestinationChip dest={{ name: d.name, img: d.images?.[0]?.url, desc: d.description }} />
                                    </div>
                                ),
                        )
                    )}
                </div>
            </section>

            {/* BEST SELLING PACKAGES */}
            <section className="bg-paper-dim py-12 md:py-20 px-4 md:px-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-8" data-aos="fade-up">
                        <span className="text-xs uppercase tracking-[0.2em] text-rust mb-4 block">Curated For You</span>
                        <h2 className="text-4xl md:text-5xl font-medium">Signature Journeys</h2>
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
                            className="inline-flex items-center gap-2 text-md uppercase font-semibold tracking-widest transition-colors hover:text-rust border-b border-ink pb-1 hover:border-rust"
                            to="/packages">
                            View All Packages
                        </Link>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS - Minimalist Timeline */}
            <section className="max-w-[1200px] mx-auto py-12 md:py-20 px-4 md:px-8">
                <div className="mb-10 text-center max-w-2xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-medium mb-6">The Process</h2>
                    <p className="text-zinc-500 leading-relaxed">
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
                            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-xs text-zinc-400 mb-8 relative z-10 group-hover:border-rust group-hover:text-rust transition-colors duration-500">
                                {s.num}
                            </div>
                            <h4 className="text-xl mb-3">{s.title}</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-paper-dim py-12 md:py-20 overflow-hidden px-4 md:px-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-8" data-aos="fade-up">
                        <span className="text-xs uppercase tracking-[0.2em] text-rust mb-4 block">From The Field</span>
                        <h2 className="text-4xl md:text-5xl font-medium">Traveler Stories</h2>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
                        {testimonials?.map((t, i) => (
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
                                <p className="text-base leading-[1.7] font-light mb-10 text-ink-soft flex-grow">"{t.quote}"</p>
                                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                                    <div>
                                        <div className="text-sm font-medium text-ink">{t.name}</div>
                                        <div className="text-[10px] text-zinc-400 tracking-widest uppercase mt-1">{t.trip}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="max-w-[1200px] mx-auto py-12 md:py-20 px-4 md:px-8 text-center">
                <h2 data-aos="fade-up" className="text-4xl sm:text-5xl md:text-7xl font-medium max-w-4xl mx-auto leading-tight mb-10">
                    Ready for takeoff? <br />
                    <span className="italic text-zinc-400">Tell us your dream coordinates.</span>
                </h2>
                <div data-aos="fade-up" data-aos-delay="100">
                    <Link
                        className="inline-block px-10 py-5 bg-ink text-white text-sm uppercase tracking-widest hover:bg-rust transition-colors duration-300"
                        to="/contact">
                        Start an Enquiry
                    </Link>
                </div>
            </section>
        </main>
    );
}
