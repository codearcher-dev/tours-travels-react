import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Award,
    HeartHandshake,
    Users,
    ArrowRight,
    Compass,
} from "lucide-react";
import coverImage from "../assets/about-cover.png";
import photo6 from "../assets/about/photo6.jpeg";
import photo1 from "../assets/about/photo1.jpeg";
import photo2 from "../assets/about/photo2.jpeg";
import photo3 from "../assets/about/photo3.jpeg";
import { countPagevisit } from "../services/initial.services";

const metrics = [
    { num: "1,000+", label: "Happy Travelers", sub: "Solo, couples & families" },
    { num: "700+", label: "Tours Completed", sub: "Safely guided" },
    { num: "4.9/5", label: "Average Rating", sub: "Verified customer reviews" },
    { num: "100%", label: "Permit Success", sub: "Nathula & North Sikkim" },
];

const coreValues = [
    {
        title: "Clear & Fixed Pricing",
        desc: "No hidden vehicle fees, sudden entry charges, or extra driver costs. The price we agree on is the price you pay.",
        icon: Award,
    },
    {
        title: "Experienced Local Drivers",
        desc: "Every hill driver in our network has at least 5+ years of experience driving safely on mountain roads in all weather.",
        icon: ShieldCheck,
    },
    {
        title: "Handpicked Hotels & Homestays",
        desc: "We check hotels and homestays ourselves for clean rooms, working heaters, hot running water, and good views.",
        icon: HeartHandshake,
    },
    {
        title: "24/7 Phone & WhatsApp Help",
        desc: "You will never feel alone. Our team is always available to help with cars, routes, weather, and local advice.",
        icon: Users,
    },
];

export default function About() {
    useEffect(() => {
        const visit = async () => {
            try {
                await countPagevisit();
            } catch {
                // Ignore tracking error
            }
        };
        visit();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 pb-16 sm:pb-20 select-none overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="relative w-full min-h-[380px] xs:min-h-[440px] sm:min-h-[500px] flex items-center py-14 xs:py-16 sm:py-20 px-3.5 sm:px-6 md:px-8 bg-slate-950 overflow-hidden">
                <img
                    src={coverImage}
                    alt="Himalayan Mist"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 bg-breathe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30" />

                <div className="relative z-10 max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 text-center lg:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-3 sm:mb-4">
                            <Compass size={14} className="text-sky-400 shrink-0" />
                            <span>About Prime Traveller</span>
                        </div>

                        <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
                            Helping you explore the <br className="hidden sm:block" />
                            <span className="text-sky-400 font-display italic">beauty of the Himalayas.</span>
                        </h1>

                        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Prime Traveller is a licensed government-approved tour operator. Based in Darjeeling and Sikkim, we provide reliable cars, clean hotels, and full support so you can travel without worry.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-[300px] xs:max-w-[360px] sm:max-w-[420px] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900">
                            <img
                                src={photo6}
                                alt="Travelers celebrating in the mountains"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/85 backdrop-blur-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 text-white text-xs">
                                <span className="font-bold text-sky-400 block text-[11px] sm:text-xs">Real Smiles, Real Memories</span>
                                <span className="text-[10px] sm:text-[11px] text-slate-300 font-normal">Travelers at Zero Point, North Sikkim</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS STRIP */}
            <section className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 -mt-6 sm:-mt-8 relative z-20">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                    {metrics.map((m, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="font-display text-2xl xs:text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-0.5 sm:mb-1">
                                {m.num}
                            </span>
                            <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                                {m.label}
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                                {m.sub}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* GUIDING PRINCIPLES */}
            <section className="max-w-[1280px] mx-auto py-14 sm:py-24 px-3.5 sm:px-6 md:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                    <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">
                        Our Promises
                    </span>
                    <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                        What You Can Count On
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal">
                        Every trip with us comes with clear prices, safe driving, clean stays, and friendly local support.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {coreValues.map((val, idx) => {
                        const Icon = val.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs flex flex-col hover:shadow-md transition-shadow">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 sm:mb-5 border border-sky-100">
                                    <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                                </div>
                                <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">
                                    {val.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                                    {val.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* MOMENTS ON THE TRAIL */}
            <section className="bg-slate-100/70 py-14 sm:py-24 px-3.5 sm:px-6 md:px-8 border-y border-slate-200/80">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                        <div>
                            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">
                                Photo Gallery
                            </span>
                            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900">
                                Photos From Our Trips
                            </h2>
                        </div>
                        <Link
                            to="/packages"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-sky-600 transition-colors">
                            <span>Explore Tours</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs bg-slate-200">
                            <img
                                src={photo1}
                                alt="Scenic Darjeeling"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs bg-slate-200">
                            <img
                                src={photo2}
                                alt="Sikkim mountain pass"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs bg-slate-200">
                            <img
                                src={photo3}
                                alt="Mountain monastery and prayer flags"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="max-w-[1280px] mx-auto pt-14 sm:pt-24 px-3.5 sm:px-6 md:px-8 text-center">
                <h2 className="font-display text-xl xs:text-2xl sm:text-4xl font-bold text-slate-900 mb-2 sm:mb-3 max-w-xl mx-auto">
                    Ready to plan your next holiday?
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-md mx-auto mb-6 sm:mb-8">
                    Contact us today to get a free, custom tour plan. No booking fees required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/contact" className="btn btn-blue px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold w-full sm:w-auto shadow-md">
                        Plan a Custom Tour
                    </Link>
                    <Link to="/packages" className="btn btn-secondary px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold w-full sm:w-auto">
                        Browse Tour Packages
                    </Link>
                </div>
            </section>
        </main>
    );
}
