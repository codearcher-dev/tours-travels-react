import team from "../data/team";
import coverImage from "../assets/about-cover.png";

const stats = [
    { num: "4,120", label: "Itineraries Drawn" },
    { num: "42", label: "Places Covered" },
    { num: "9.4", label: "Avg. Traveler Rating" },
    { num: "10", label: "Years Plotting Routes" },
];

const timeline = [
    { year: "2016", title: "One route, two founders", desc: "A hand-drawn Southeast Asia itinerary, shared with 12 travelers in year one." },
    { year: "2019", title: "First overseas desk", desc: "Opened a coordinator office in Bali to run ground logistics in-region." },
    { year: "2022", title: "Crossed 30 countries", desc: "Expanded into Europe and the Americas with dedicated route specialists." },
    { year: "2026", title: "4,000th itinerary shipped", desc: "Today's desk plots routes across 42 countries, still one traveler at a time." },
];

export default function About() {
    return (
        <main className="pt-20 pb-16 select-none relative">
            {/* HERO / STORY */}
            <div className="absolute inset-0 z-0 w-full h-screen bg-ink">
                <div className="w-full h-full">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover opacity-80 inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 mix-blend-multiply"></div>
                </div>
            </div>
            <section className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-16 md:mb-24 relative">
                <div className="lg:col-span-7">
                    <h1
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="font-display text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.1] tracking-[-0.01em] mb-10 text-rust">
                        Started with one
                        <br />
                        <span className="italic text-zinc-200">overpacked backpack.</span>
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="200" className="text-white leading-relaxed text-lg font-light max-w-xl">
                        Meridian Journeys began in 2016 as two friends plotting a single route across Southeast Asia for other backpackers. A decade
                        on, we've drawn over 4,000 itineraries — but the rule hasn't changed: every trip is plotted by a person who has actually stood
                        at that coordinate.
                    </p>
                </div>
                <div data-aos="fade-left" className="lg:col-span-5 relative h-[400px] md:h-[600px] w-full">
                    <img
                        src="https://images.unsplash.com/photo-1670020112207-0e3592080eac?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Team planning a route"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="border-y border-zinc-200 bg-paper-dim">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((s, i) => (
                        <div data-aos="fade-up" data-aos-delay={i * 100} className="text-center" key={s.label}>
                            <div className="font-display text-4xl md:text-5xl text-ink mb-4">{s.num}</div>
                            <div className="text-xs uppercase text-zinc-500 font-mono tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TIMELINE (Magazine style) */}
            <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
                <div data-aos="fade-up" className="mb-12">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-6 block text-center">Timeline</span>
                    <h2 className="font-display text-4xl md:text-6xl text-center">How the map grew</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-10 max-w-4xl mx-auto">
                    {timeline.map((t, i) => (
                        <div data-aos="fade-up" data-aos-delay={i * 100} key={t.year} className="flex flex-col">
                            <div className="font-display text-4xl text-rust mb-4">{t.year}</div>
                            <h4 className="text-xl font-medium mb-3">{t.title}</h4>
                            <p className="text-zinc-500 font-light leading-relaxed">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TEAM */}
            <section className="bg-ink text-white py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <div data-aos="fade-up" className="mb-12 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-6 block">The Desk</span>
                        <h2 className="font-display text-4xl md:text-6xl">People behind the routes</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {team.map((m, i) => (
                            <div data-aos="fade-up" data-aos-delay={i * 100} className="group" key={m.name}>
                                <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-zinc-800">
                                    <img
                                        src={m.img}
                                        alt={m.name}
                                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="text-xl font-display mb-1">{m.name}</div>
                                <div className="text-xs text-zinc-400 font-mono uppercase tracking-widest">{m.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
