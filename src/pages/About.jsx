import images from "../data/customerImages.js";
import coverImage from "../assets/about-cover.png";
import photo6 from "../assets/about/photo6.jpeg";

const stats = [
    { num: "1000+", label: "Happy Customers" },
    { num: "700+", label: "Tours Completed" },
    { num: "4.6/5.0", label: "Avg. Traveler Rating" },
    // { num: "10", label: "Years Plotting Routes" },
];

const whyUs = [
    { title: "Curated Itineraries", desc: "Expertly designed packages covering iconic landmarks as well as hidden gems." },
    { year: "2019", title: "Comfort First", desc: "Verified hotel stays, reliable transportation, and vetted local guides." },
    { title: "Personalized Packages", desc: "Flexible plans customized for solo explorers, couples, families, and corporate groups." },
    { title: "24/7 Dedicated Assistance", desc: "Real-time help from booking to your safe return home." },
];

export default function About() {
    return (
        <main className="select-none overflow-x-clip">
            {/* HERO / STORY */}
            <div className="relative w-full min-h-screen flex items-center pt-28 pb-20">
                <div className="absolute inset-0 z-0 bg-ink">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 mix-blend-multiply"></div>
                </div>

                <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
                    <div className="lg:col-span-7">
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="font-display text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.1] tracking-[-0.01em] mb-10 text-rust">
                            Started with one
                            <br />
                            <span className="italic text-zinc-200">overpacked backpack.</span>
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="200" className="text-white leading-relaxed text-md font-light max-w-xl">
                            Discover the extraordinary with Prime Traveller, your trusted travel partner dedicated to curating seamless,
                            budget-friendly, and unforgettable journeys. Specializing in breathtaking Himalayan getaways—including Darjeeling,
                            Gangtok, and North Sikkim. Whether you seek serene mountain escapes, cultural expeditions, or thrilling adventures, we
                            ensure every detail ofyour trip is planned to perfection.
                        </p>
                    </div>
                    <div data-aos="fade-left" className="lg:col-span-5 relative h-[300px] md:h-[400px] w-full">
                        <img src={photo6} alt="group image" className="w-full h-full object-cover rounded-md" />
                    </div>
                </section>
            </div>

            {/* STATS STRIP */}
            <section className="border-y border-zinc-200 bg-paper-dim">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {stats.map((s, i) => (
                        <div data-aos="fade-up" data-aos-delay={i * 100} className="text-center" key={i}>
                            <div className="text-4xl md:text-5xl text-ink mb-4">{s.num}</div>
                            <div className="text-xs uppercase text-zinc-500 tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
            {/* MISSION & VISION */}
            <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Mission */}
                    <div data-aos="fade-right">
                        <span className="text-xs uppercase tracking-[0.2em] text-rust mb-4 block">Our Mission</span>
                        <h2 className="text-3xl md:text-4xl text-ink mb-8">What drives us forward</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="text-rust mt-1 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-ink mb-1">Affordable & Accessible</h4>
                                    <p className="text-zinc-500 font-light leading-relaxed">
                                        Deliver value-driven, transparent pricing without compromising on comfort or safety.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-rust mt-1 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-ink mb-1">Memorable Experiences</h4>
                                    <p className="text-zinc-500 font-light leading-relaxed">
                                        Create enriching, authentic travel memories tailored to every traveler's unique pace.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-rust mt-1 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-ink mb-1">Seamless Support</h4>
                                    <p className="text-zinc-500 font-light leading-relaxed">
                                        Provide reliable, end-to-end customer care and premium on-ground logistics for a truly hassle-free journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Vision */}
                    <div
                        data-aos="fade-left"
                        className="bg-paper-dim p-8 md:p-12 rounded-2xl flex flex-col justify-center h-full border border-zinc-200">
                        <span className="text-xs uppercase tracking-[0.2em] text-rust mb-4 block">Our Vision</span>
                        <h2 className="text-3xl md:text-4xl text-ink mb-6">Setting the benchmark</h2>
                        <p className="text-zinc-600 font-light leading-relaxed text-md">
                            To become India’s most trusted and preferred travel service provider, setting the benchmark in tourism through
                            personalized itineraries, responsible travel practices, and exceptional service standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
                <div data-aos="fade-up" className="mb-12">
                    <span className="text-xs uppercase tracking-[0.2em] text-rust mb-6 block text-center">Timeline</span>
                    <h2 className="text-4xl md:text-6xl text-center">Why choose us ?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-10 max-w-4xl mx-auto">
                    {whyUs.map((t, i) => (
                        <div data-aos="fade-up" data-aos-delay={i * 100} key={i} className="flex flex-col">
                            <h4 className="text-xl font-medium mb-3 text-rust">{t.title}</h4>
                            <p className="text-zinc-500 font-light leading-relaxed">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TEAM */}
            <section className="bg-ink text-white py-16 md:py-24 border-b-2 border-gray-400">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <div data-aos="fade-up" className="mb-12 text-center">
                        <span className="text-xs uppercase tracking-[0.2em] text-rust mb-6 block">The Desk</span>
                        <h2 className="text-4xl md:text-6xl">Our happy customers</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {images.map((m, i) => (
                            <div data-aos="fade-up" data-aos-delay={i * 100} className="group" key={m.name}>
                                <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-zinc-800">
                                    <img
                                        src={m}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
