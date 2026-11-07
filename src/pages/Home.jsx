import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    MapPin,
    Calendar,
    Users,
    Search,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    Star,
    Compass,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    PhoneCall,
    Award,
    HeartHandshake,
    Check,
    Car,
    Flame,
} from "lucide-react";
import DestinationChip from "../components/DestinationChip";
import PackageCard from "../components/PackageCard";
import { SkeletonPackageCard, ErrorState, EmptyState } from "../components/ui/LoadingState";
import { CustomSelect } from "../components/ui/CustomControls";
import { usePackages } from "../context/PackageContext";
import coverImage from "../assets/home-cover.png";
import TextType from "../components/ui/animations/TextType";
import { getFeedbacks } from "../services/feedback.services";
import { countPagevisit } from "../services/initial.services";

const processSteps = [
    {
        step: "01",
        title: "Choose Your Tour",
        desc: "Pick one of our popular tour packages or tell us where you want to go.",
        icon: Compass,
    },
    {
        step: "02",
        title: "Customize Your Trip",
        desc: "Change the number of days, choose your preferred car, or add extra sightseeing stops.",
        icon: Calendar,
    },
    {
        step: "03",
        title: "Clear, Upfront Pricing",
        desc: "Get a complete price quote with hotels, car, driver, and permits included. No hidden fees.",
        icon: Sparkles,
    },
    {
        step: "04",
        title: "Relax & Enjoy",
        desc: "Travel worry-free. Our local team is available 24/7 to assist you throughout your journey.",
        icon: CheckCircle2,
    },
];

const valuePillars = [
    {
        title: "Experienced Mountain Drivers",
        desc: "Safe, licensed local drivers who know the mountain roads, steep turns, and weather conditions well.",
        badge: "Safety First",
        icon: ShieldCheck,
    },
    {
        title: "Handpicked Hotels & Stays",
        desc: "Clean, comfortable rooms with mountain views, warm blankets, and working room heaters.",
        badge: "Handpicked",
        icon: Award,
    },
    {
        title: "All Permits Arranged",
        desc: "We take care of all required government permits for North Sikkim, Nathula Pass, and border areas.",
        badge: "Zero Hassle",
        icon: HeartHandshake,
    },
    {
        title: "24/7 Trip Support",
        desc: "Our team is always reachable by call or WhatsApp to help with weather, road updates, and local guidance.",
        badge: "Live Support",
        icon: Users,
    },
];

const destinationOptions = [
    { label: "All Destinations", value: "" },
    { label: "Darjeeling", value: "Darjeeling" },
    { label: "North Sikkim", value: "North Sikkim" },
    { label: "Gangtok", value: "Gangtok" },
    { label: "Kalimpong", value: "Kalimpong" },
    { label: "Mirik", value: "Mirik" },
];

const travelStyleOptions = [
    { label: "Any Travel Style", value: "" },
    { label: "Couple / Honeymoon", value: "Couple" },
    { label: "Family & Friends", value: "Group" },
    { label: "Solo Explorer", value: "Solo" },
];

const availableStops = [
    { id: "Gangtok", label: "Gangtok", desc: "Capital & Monasteries", altitude: "5,410 ft" },
    { id: "Lachung", label: "Lachung", desc: "Yumthang Valley Base", altitude: "8,858 ft" },
    { id: "Lachen", label: "Lachen", desc: "Gurudongmar Lake Base", altitude: "8,960 ft" },
    { id: "Darjeeling", label: "Darjeeling", desc: "Tea Estates & Tiger Hill", altitude: "6,709 ft" },
    { id: "Pelling", label: "Pelling", desc: "Kanchenjunga Vistas", altitude: "7,050 ft" },
    { id: "Kalimpong", label: "Kalimpong", desc: "Orchids & Colonial Stays", altitude: "4,101 ft" },
];

export default function Home() {
    const { packages, destinations, loading, error, retry } = usePackages();
    const [testimonials, setTestimonials] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchDest, setSearchDest] = useState("");
    const [searchType, setSearchType] = useState("");
    const navigate = useNavigate();

    const activeDestinationOptions = useMemo(() => {
        if (!destinations || destinations.length === 0) return destinationOptions;
        return [
            { label: "All Destinations", value: "" },
            ...destinations.map((d) => ({ label: d.name, value: d.name })),
        ];
    }, [destinations]);

    // Interactive Route Builder state
    const [selectedStops, setSelectedStops] = useState(["Gangtok", "Lachung"]);
    const [customDuration, setCustomDuration] = useState("5 Nights / 6 Days");
    const [customVehicle, setCustomVehicle] = useState("Innova / Scorpio 4x4");

    const scrollContainerRef = useRef(null);

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const offset = direction === "left" ? -340 : 340;
            scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    const handleQuickSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchDest) params.set("dest", searchDest);
        if (searchType) params.set("type", searchType);
        navigate(`/packages?${params.toString()}`);
    };

    const toggleStop = (id) => {
        if (selectedStops.includes(id)) {
            if (selectedStops.length > 1) {
                setSelectedStops(selectedStops.filter((s) => s !== id));
            }
        } else {
            setSelectedStops([...selectedStops, id]);
        }
    };

    const handleSendCustomEnquiry = () => {
        navigate(
            `/contact?enq=custom&stops=${encodeURIComponent(selectedStops.join(", "))}&duration=${encodeURIComponent(
                customDuration,
            )}&vehicle=${encodeURIComponent(customVehicle)}`,
        );
    };

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getFeedbacks(4, Math.floor(Math.random() * 5));
                if (data?.feedbacks && Array.isArray(data.feedbacks) && data.feedbacks.length > 0) {
                    setTestimonials(
                        data.feedbacks
                            .filter((f) => f && (f.review || f.comment))
                            .map((f) => ({
                                name: f.name || "Verified Traveler",
                                trip: f.package || "Himalayan Tour",
                                quote: f.review || f.comment || "",
                                rating: f.rating || 5,
                            })),
                    );
                } else {
                    setTestimonials([]);
                }
            } catch {
                setTestimonials([]);
            }
        };

        const visit = async () => {
            try {
                await countPagevisit();
            } catch {
                // Ignore tracking error
            }
        };

        fetchTestimonials();
        visit();
    }, []);

    const filteredPackages = packages.filter((pkg) => {
        if (selectedCategory === "all") return true;
        const locationName = (pkg.location?.name || "").toLowerCase();
        const dests = (pkg.destinations || []).map((d) => d.toLowerCase());
        return locationName.includes(selectedCategory.toLowerCase()) || dests.some((d) => d.includes(selectedCategory.toLowerCase()));
    });

    return (
        <main className="min-h-screen bg-slate-50 pb-16 sm:pb-20 select-none overflow-x-hidden">
            {/* 1. ARCHITECTURAL HERO WITH COMPREHENSIVE SEARCH & DOCK */}
            <section className="relative w-full min-h-[580px] xs:min-h-[640px] sm:min-h-[700px] lg:min-h-[780px] flex items-center justify-center py-14 xs:py-16 sm:py-20 px-3.5 sm:px-6 md:px-8 bg-slate-950 overflow-hidden">
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={coverImage}
                        alt="Himalayan Mountains at Sunrise"
                        className="w-full h-full object-cover object-center opacity-40 bg-breathe"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30" />
                </div>

                <div className="relative z-10 max-w-[1280px] w-full mx-auto text-center flex flex-col items-center">
                    {/* Trust Pill with Live Indicator */}
                    <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] xs:text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-sm max-w-[calc(100vw-2rem)] sm:max-w-none text-left sm:text-center">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        <ShieldCheck size={15} className="text-sky-400 shrink-0" />
                        <span className="leading-tight sm:leading-normal">Sikkim & West Bengal Govt. Authorized Tour Operator</span>
                    </div>

                    {/* Headline with Typewriter */}
                    <h1 className="font-display text-2xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight max-w-5xl">
                        Unveil the Majesty of <br className="hidden sm:block" />
                        <span className="block sm:inline text-sky-400 italic font-display">
                            <TextType
                                text={["Darjeeling", "North Sikkim", "Gangtok", "Kalimpong", "Zero Point", "Lachung"]}
                                typingSpeed={75}
                                pauseDuration={1800}
                                showCursor
                                cursorCharacter="|"
                            />
                        </span>
                    </h1>

                    <p className="mt-3 sm:mt-5 text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed px-1">
                        Tour packages, private cars, comfortable hotels, and all required travel permits handled for you.
                    </p>

                    {/* Search Console Dock using Custom Select Components */}
                    <form
                        onSubmit={handleQuickSearch}
                        className="mt-6 sm:mt-10 w-full max-w-3xl bg-white p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                        <div className="flex-1 w-full text-left">
                            <CustomSelect
                                aria-label="Destination"
                                icon={MapPin}
                                value={searchDest}
                                onChange={setSearchDest}
                                options={activeDestinationOptions}
                                placeholder="Choose Destination"
                            />
                        </div>

                        <div className="flex-1 w-full text-left">
                            <CustomSelect
                                aria-label="Travel Style"
                                icon={Users}
                                value={searchType}
                                onChange={setSearchType}
                                options={travelStyleOptions}
                                placeholder="Choose Travel Style"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-blue px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl shrink-0 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto">
                            <Search size={16} />
                            <span>Explore Tours</span>
                        </button>
                    </form>

                    {/* Trending Pill Tags */}
                    <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-300 px-1">
                        <span className="text-sky-400 font-semibold flex items-center gap-1 text-[11px] sm:text-xs">
                            <Flame size={14} /> Trending Tours:
                        </span>
                        {["Gurudongmar Lake", "Nathula Pass", "Tiger Hill Sunrise", "Yumthang Valley"].map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                    setSearchDest(tag.split(" ")[0]);
                                    navigate(`/packages?dest=${encodeURIComponent(tag.split(" ")[0])}`);
                                }}
                                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white text-[10px] sm:text-[11px] transition-colors border border-white/15">
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Trust Highlights Strip */}
                    <div className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-3.5 xs:gap-6 sm:gap-12 text-[11px] xs:text-xs sm:text-sm text-slate-300 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Star size={16} className="text-amber-400 fill-amber-400" />
                            <span className="font-bold text-white">4.9/5.0</span>
                            <span className="text-slate-400">(700+ Reviews)</span>
                        </div>
                        <div className="hidden xs:block w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <div>
                            <span className="font-bold text-white">1,000+</span> Happy Travelers
                        </div>
                        <div className="hidden xs:block w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <div>
                            <span className="font-bold text-white">100%</span> Custom Plans
                        </div>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <div className="hidden md:block">
                            <span className="font-bold text-white">4x4</span> Mountain Cars
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. INTERACTIVE ROUTE BUILDER */}
            <section className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 -mt-8 sm:-mt-14 relative z-20">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl border border-slate-200 overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-slate-100">
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-sky-600 font-bold mb-1">
                                <Sparkles size={14} /> Plan Your Custom Trip
                            </span>
                            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Customize Your Himalayan Tour</h2>
                            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                                Pick the places you want to visit, choose your preferred car, and send us an enquiry.
                            </p>
                        </div>

                        <div className="w-full lg:w-auto shrink-0 flex items-center">
                            <button
                                type="button"
                                onClick={handleSendCustomEnquiry}
                                className="btn btn-blue text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto shadow-sm">
                                <span>Enquire for Selected Route</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Step A: Select Destinations */}
                    <div className="mt-6 sm:mt-8">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider">
                                1. Select Destinations ({selectedStops.length} selected):
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-slate-400">Tap to select or remove</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3.5">
                            {availableStops.map((stop) => {
                                const isSelected = selectedStops.includes(stop.id);
                                return (
                                    <button
                                        key={stop.id}
                                        type="button"
                                        onClick={() => toggleStop(stop.id)}
                                        className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-left border transition-all flex flex-col justify-between ${
                                            isSelected
                                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                                : "bg-slate-50 text-slate-800 border-slate-200 hover:border-sky-500"
                                        }`}>
                                        <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-1">
                                            <span className="text-[11px] sm:text-xs font-bold truncate">{stop.label}</span>
                                            {isSelected ? (
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                                                    <Check size={10} strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-slate-300 shrink-0" />
                                            )}
                                        </div>
                                        <div>
                                            <span
                                                className={`block text-[10px] sm:text-[11px] truncate ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                                                {stop.desc}
                                            </span>
                                            <span
                                                className={`block text-[9px] sm:text-[10px] font-medium mt-0.5 sm:mt-1 ${isSelected ? "text-sky-300" : "text-slate-400"}`}>
                                                {stop.altitude}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step B: Duration & Vehicle Preference */}
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">2. Trip Duration</label>
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                                {["3N / 4D", "5N / 6D", "7N / 8D"].map((dur) => (
                                    <button
                                        key={dur}
                                        type="button"
                                        onClick={() => setCustomDuration(dur)}
                                        className={`py-2 sm:py-3 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold border transition-all text-center ${
                                            customDuration === dur
                                                ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                        }`}>
                                        {dur}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">3. Preferred Car</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
                                {["Innova / Scorpio 4x4", "Sedan (Dzire / Etios)"].map((veh) => (
                                    <button
                                        key={veh}
                                        type="button"
                                        onClick={() => setCustomVehicle(veh)}
                                        className={`py-2 sm:py-3 px-2 sm:px-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                                            customVehicle === veh
                                                ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                        }`}>
                                        <Car size={14} className="shrink-0" />
                                        <span className="truncate">{veh}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TRENDING DESTINATIONS SECTION */}
            <section className="bg-slate-100/70 border-y border-slate-200/80 py-14 sm:py-24 px-3.5 sm:px-6 md:px-8 mt-14 sm:mt-24">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                        <div>
                            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Popular Places</span>
                            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Trending Destinations</h2>
                        </div>

                        {/* Desktop Scroll Chevrons */}
                        {destinations.length > 0 && (
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleScroll("left")}
                                    className="p-2.5 sm:p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
                                    aria-label="Scroll left">
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleScroll("right")}
                                    className="p-2.5 sm:p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
                                    aria-label="Scroll right">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Horizontal Scroller */}
                    {loading ? (
                        <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
                            Loading destinations...
                        </div>
                    ) : destinations.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
                            No destinations currently available.
                        </div>
                    ) : (
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
                            {destinations.map((dest, i) => (
                                <div key={dest.id || dest._id || i} className="snap-start shrink-0 w-[260px] xs:w-[280px] sm:w-[330px]">
                                    <DestinationChip dest={dest} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 4. SIGNATURE PACKAGES SECTION */}
            <section className="bg-slate-50 py-14 sm:py-24 px-3.5 sm:px-6 md:px-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                        <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Featured Tours</span>
                        <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Signature Tour Packages</h2>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal">
                            Carefully planned itineraries with private cars, comfortable stays, and top sightseeing spots.
                        </p>

                        {/* Category filter tabs */}
                        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                            {[
                                { id: "all", label: "All Packages" },
                                { id: "darjeeling", label: "Darjeeling" },
                                { id: "sikkim", label: "Sikkim" },
                                { id: "gangtok", label: "Gangtok" },
                                { id: "kalimpong", label: "Kalimpong" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(tab.id)}
                                    className={`px-3 py-1.5 sm:px-4.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-xl sm:rounded-2xl transition-all ${
                                        selectedCategory === tab.id
                                            ? "bg-slate-900 text-white shadow-xs font-bold"
                                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                    }`}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Leading Loading State Handler */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {Array(3)
                                .fill(0)
                                .map((_, idx) => (
                                    <SkeletonPackageCard key={idx} />
                                ))}
                        </div>
                    ) : error ? (
                        <ErrorState title="Unable to load packages" error={error} onRetry={retry} />
                    ) : filteredPackages.length === 0 ? (
                        <EmptyState
                            title="No packages match this category"
                            onAction={() => setSelectedCategory("all")}
                            actionLabel="View All Packages"
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {filteredPackages.slice(0, 6).map((pkg, i) => (
                                <PackageCard key={pkg._id || i} pkg={pkg} />
                            ))}
                        </div>
                    )}

                    <div className="mt-10 sm:mt-12 text-center">
                        <Link
                            to="/packages"
                            className="btn btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-xs w-full sm:w-auto">
                            <span>Browse All Tour Packages</span>
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. WHY CHOOSE PRIME TRAVELLER */}
            <section className="bg-slate-950 text-white py-14 sm:py-24 px-3.5 sm:px-6 md:px-8 border-y border-slate-800 relative overflow-hidden">
                <div className="max-w-[1280px] mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                        <div className="lg:col-span-5 text-center lg:text-left">
                            <span className="text-xs uppercase tracking-wider text-sky-400 font-bold block mb-1">Why Travel With Us</span>
                            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 sm:mb-4 text-white">
                                Why Travelers Choose Prime Traveller
                            </h2>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                                Traveling in the mountains requires good drivers, reliable cars, permits, and local help. We take care of every detail
                                so you can relax and enjoy your holiday.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                                <Link to="/about" className="btn btn-blue text-xs sm:text-sm w-full sm:w-auto">
                                    About Us
                                </Link>
                                <a
                                    href="tel:+919142234213"
                                    className="btn btn-secondary bg-white/10 hover:bg-white/15 text-white border-white/20 text-xs sm:text-sm w-full sm:w-auto">
                                    <PhoneCall size={14} className="text-sky-400" />
                                    <span>Call Our Team</span>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4.5">
                            {valuePillars.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white/[0.04] hover:bg-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-sky-400/40 shadow-xs transition-colors flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                                                    <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                                                </div>
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-400 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10">
                                                    {item.badge}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">{item.title}</h3>
                                            <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. THE PROCESS / HOW WE PLAN */}
            <section className="bg-slate-100/70 py-14 sm:py-24 px-3.5 sm:px-6 md:px-8 border-b border-slate-200/80">
                <div className="max-w-[1280px] mx-auto text-center">
                    <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Simple 4-Step Process</span>
                    <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-8 sm:mb-12">
                        How We Plan Your Tour
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {processSteps.map((s) => {
                            const IconComponent = s.icon;
                            return (
                                <div
                                    key={s.step}
                                    className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 sm:mb-5">
                                        <IconComponent size={22} className="sm:w-6 sm:h-6" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">Step {s.step}</span>
                                    <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">{s.title}</h3>
                                    <p className="text-xs text-slate-500 font-normal leading-relaxed">{s.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIALS */}
            {testimonials.length > 0 && (
                <section className="bg-slate-50 max-w-[1280px] mx-auto py-14 sm:py-24 px-3.5 sm:px-6 md:px-8">
                    <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
                        <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Guest Reviews</span>
                        <h2 className="font-display text-xl xs:text-2xl sm:text-3xl font-bold text-slate-900">What Travelers Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {testimonials.map((t, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="flex items-center gap-1 text-amber-500 mb-3 sm:mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={15} className="fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic mb-5 sm:mb-6">"{t.quote}"</p>
                                </div>

                                <div className="pt-3.5 sm:pt-4 border-t border-slate-100">
                                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{t.name}</h4>
                                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide uppercase block mt-0.5">
                                        {t.trip}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 8. CALL TO ACTION */}
            <section className="max-w-[1280px] mx-auto pb-14 sm:pb-24 px-3.5 sm:px-6 md:px-8">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 md:p-14 text-center text-white border border-slate-800 shadow-2xl">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="text-xs uppercase tracking-wider text-sky-400 font-bold block mb-1.5 sm:mb-2">Custom Plans</span>
                        <h2 className="font-display text-xl xs:text-2xl sm:text-4xl font-bold leading-tight mb-2.5 sm:mb-3">
                            Ready to Plan Your Mountain Holiday?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-light mb-6 sm:mb-8 leading-relaxed">
                            Tell us your travel dates and group size. We will send you a personalized plan and price estimate within 24 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/contact"
                                className="btn btn-blue w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md">
                                Plan Your Custom Tour
                            </Link>
                            <a
                                href="https://wa.me/919142234213?text=Hi%20Prime%20Traveller%2C%20I%20want%20to%20plan%20a%20tour."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary bg-transparent text-white border-slate-600 hover:bg-white/10 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold">
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
