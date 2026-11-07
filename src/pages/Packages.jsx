import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import PackageCard from "../components/PackageCard";
import { usePackages } from "../context/PackageContext";
import { SkeletonPackageCard, EmptyState, ErrorState } from "../components/ui/LoadingState";
import { CustomSelect } from "../components/ui/CustomControls";
import coverImage from "../assets/package-cover.avif";
import { countPagevisit } from "../services/initial.services";

const destinationOptions = [
    { label: "All Destinations", value: "all" },
    { label: "Darjeeling", value: "Darjeeling" },
    { label: "North Sikkim", value: "North Sikkim" },
    { label: "Gangtok", value: "Gangtok" },
    { label: "Kalimpong", value: "Kalimpong" },
    { label: "Mirik", value: "Mirik" },
];

const priceOptions = [
    { label: "All Budgets", value: "all" },
    { label: "Under ₹10,000", value: "under-10k" },
    { label: "₹10,000 - ₹20,000", value: "10k-20k" },
    { label: "Above ₹20,000", value: "above-20k" },
];

const travelStyleOptions = [
    { label: "All Travel Styles", value: "all" },
    { label: "Couple / Honeymoon", value: "Couple" },
    { label: "Family & Group", value: "Group" },
    { label: "Solo Explorer", value: "Solo" },
];

const sortOptions = [
    { label: "Sort: Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Duration: Shortest", value: "duration-asc" },
    { label: "Duration: Longest", value: "duration-desc" },
];

export default function Packages() {
    const { packages, destinations, loading, error, retry } = usePackages();
    const [searchParams, setSearchParams] = useSearchParams();

    const activeDestinationOptions = useMemo(() => {
        if (!destinations || destinations.length === 0) return destinationOptions;
        return [
            { label: "All Destinations", value: "all" },
            ...destinations.map((d) => ({ label: d.name, value: d.name })),
        ];
    }, [destinations]);

    const initialDest = searchParams.get("dest") || "all";
    const initialType = searchParams.get("type") || "all";

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDest, setSelectedDest] = useState(initialDest);
    const [selectedStyle, setSelectedStyle] = useState(initialType);
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [sortBy, setSortBy] = useState("recommended");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    useEffect(() => {
        const destParam = searchParams.get("dest");
        const typeParam = searchParams.get("type");
        if (destParam) setSelectedDest(destParam);
        if (typeParam) setSelectedStyle(typeParam);
    }, [searchParams]);

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

    const filteredPackages = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return packages.filter((pkg) => {
            const searchableText = [
                pkg.name,
                pkg.description,
                pkg.location?.name,
                ...(pkg.destinations || []),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesQuery = !query || searchableText.includes(query);

            const matchesDest =
                selectedDest === "all" ||
                pkg.location?.name?.toLowerCase().includes(selectedDest.toLowerCase()) ||
                (pkg.destinations || []).some((d) => d.toLowerCase().includes(selectedDest.toLowerCase()));

            const pkgStyle = (pkg.type || pkg.packageType || "all").toLowerCase();
            const matchesStyle = selectedStyle === "all" || pkgStyle === selectedStyle.toLowerCase();

            const price = Number(pkg.price?.discounted || pkg.price?.actual || 0);
            let matchesPrice = true;
            if (selectedPrice === "under-10k") matchesPrice = price < 10000;
            else if (selectedPrice === "10k-20k") matchesPrice = price >= 10000 && price <= 20000;
            else if (selectedPrice === "above-20k") matchesPrice = price > 20000;

            return matchesQuery && matchesDest && matchesStyle && matchesPrice;
        });
    }, [packages, searchTerm, selectedDest, selectedStyle, selectedPrice]);

    const sortedPackages = useMemo(() => {
        const list = [...filteredPackages];
        if (sortBy === "price-asc") {
            list.sort((a, b) => (a.price?.discounted || 0) - (b.price?.discounted || 0));
        } else if (sortBy === "price-desc") {
            list.sort((a, b) => (b.price?.discounted || 0) - (a.price?.discounted || 0));
        } else if (sortBy === "duration-asc") {
            list.sort((a, b) => (a.duration?.days || 0) - (b.duration?.days || 0));
        } else if (sortBy === "duration-desc") {
            list.sort((a, b) => (b.duration?.days || 0) - (a.duration?.days || 0));
        }
        return list;
    }, [filteredPackages, sortBy]);

    const activeFilterCount =
        (searchTerm ? 1 : 0) +
        (selectedDest !== "all" ? 1 : 0) +
        (selectedStyle !== "all" ? 1 : 0) +
        (selectedPrice !== "all" ? 1 : 0);

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedDest("all");
        setSelectedStyle("all");
        setSelectedPrice("all");
        setSortBy("recommended");
        setSearchParams({});
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-16 sm:pb-20 select-none overflow-x-hidden">
            {/* HERO BANNER */}
            <div className="relative w-full min-h-[280px] xs:min-h-[320px] sm:min-h-[400px] flex items-center justify-center py-12 xs:py-14 sm:py-16 px-3.5 sm:px-6 md:px-8 bg-slate-950 overflow-hidden">
                <img
                    src={coverImage}
                    alt="Scenic Mountain Road"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 bg-breathe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-bold block mb-1.5 sm:mb-2">
                        Himalayan Tour Plans
                    </span>
                    <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold text-white leading-tight">
                        Curated Tour Packages
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg mx-auto">
                        Explore well-planned tours across Darjeeling, Sikkim, and India. Every package includes private cars, comfortable hotels, and 24/7 travel assistance.
                    </p>
                </div>
            </div>

            {/* CUSTOM FILTER BAR (No native select used anywhere) */}
            <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 -mt-6 sm:-mt-8 relative z-20">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-lg border border-slate-200 flex flex-col gap-3.5 sm:gap-4">
                    {/* Top Row: Search and Mobile Filter Toggle */}
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3">
                        {/* Search Bar */}
                        <div className="relative flex-1 min-w-0">
                            <Search size={17} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by destination, hill, monastery or keyword..."
                                className="w-full bg-slate-50 pl-10 sm:pl-11 pr-9 sm:pr-10 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 transition-colors"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        {/* Mobile & Tablet Filter Toggle */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                                className="flex-1 btn btn-secondary py-2.5 text-xs font-semibold justify-center">
                                <SlidersHorizontal size={14} className="text-slate-600" />
                                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
                            </button>

                            {activeFilterCount > 0 && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                                    title="Reset filters">
                                    <RotateCcw size={15} />
                                </button>
                            )}
                        </div>

                        {/* Desktop Custom Dropdown Filters */}
                        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-wrap xl:flex-nowrap">
                            <div className="w-32 xl:w-40 min-w-[120px]">
                                <CustomSelect
                                    value={selectedDest}
                                    onChange={setSelectedDest}
                                    options={activeDestinationOptions}
                                />
                            </div>

                            <div className="w-32 xl:w-36 min-w-[120px]">
                                <CustomSelect
                                    value={selectedPrice}
                                    onChange={setSelectedPrice}
                                    options={priceOptions}
                                />
                            </div>

                            <div className="w-32 xl:w-40 min-w-[120px]">
                                <CustomSelect
                                    value={selectedStyle}
                                    onChange={setSelectedStyle}
                                    options={travelStyleOptions}
                                />
                            </div>

                            <div className="w-36 xl:w-44 min-w-[130px]">
                                <CustomSelect
                                    value={sortBy}
                                    onChange={setSortBy}
                                    options={sortOptions}
                                />
                            </div>

                            {activeFilterCount > 0 && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="text-xs text-sky-600 hover:text-sky-700 font-bold uppercase tracking-wider transition-colors shrink-0 px-2">
                                    Reset ({activeFilterCount})
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile & Tablet Filter Panel (Collapsible) */}
                    {mobileFilterOpen && (
                        <div className="lg:hidden pt-3 sm:pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                            <CustomSelect
                                label="Destination"
                                value={selectedDest}
                                onChange={setSelectedDest}
                                options={activeDestinationOptions}
                            />

                            <CustomSelect
                                label="Budget Range"
                                value={selectedPrice}
                                onChange={setSelectedPrice}
                                options={priceOptions}
                            />

                            <CustomSelect
                                label="Travel Style"
                                value={selectedStyle}
                                onChange={setSelectedStyle}
                                options={travelStyleOptions}
                            />

                            <CustomSelect
                                label="Sort Order"
                                value={sortBy}
                                onChange={setSortBy}
                                options={sortOptions}
                            />

                            <div className="sm:col-span-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setMobileFilterOpen(false)}
                                    className="btn btn-primary py-3 text-xs font-bold w-full">
                                    Apply Filters ({sortedPackages.length} Available)
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Results count & active tags row */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span>
                            Showing <strong className="text-slate-900">{sortedPackages.length}</strong> {sortedPackages.length === 1 ? "tour package" : "tour packages"}
                        </span>

                        {activeFilterCount > 0 && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="text-sky-600 hover:text-sky-700 font-bold uppercase tracking-wider transition-colors hidden sm:block">
                                Clear all filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* LEADING LOADING STATE & PACKAGES GRID */}
            <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 mt-6 sm:mt-8">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {Array(6)
                            .fill(0)
                            .map((_, idx) => (
                                <SkeletonPackageCard key={idx} />
                            ))}
                    </div>
                ) : error ? (
                    <ErrorState title="Unable to load packages" error={error} onRetry={retry} />
                ) : sortedPackages.length === 0 ? (
                    <EmptyState
                        title="No Journeys Match Your Search"
                        message="Try clearing your search terms or resetting filters to discover more Himalayan tours."
                        actionLabel="Reset All Filters"
                        onAction={resetFilters}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {sortedPackages.map((pkg, idx) => (
                            <PackageCard key={pkg._id || idx} pkg={pkg} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
