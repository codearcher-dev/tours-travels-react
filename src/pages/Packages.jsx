import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import { usePackages } from "../context/PackageContext";
import SkeletonPackageCard from "../components/ui/loading-state/SkeletonPackageCard";
import coverImage from "../assets/package-cover.avif";

export default function Packages() {
    const { packages, loading, error, retry, setPackages } = usePackages();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState("none");
    const [reverseClicked, setReverseClicked] = useState(false);

    const sortType = ["price", "latest"];

    const states = [...new Set(packages.map((pkg) => pkg.location?.name).filter(Boolean))].sort();
    const priceRanges = [
        { label: "Under ₹10,000", value: "under-10000", min: 0, max: 10000 },
        { label: "₹10,000 - ₹30,000", value: "10000-30000", min: 10000, max: 30000 },
        { label: "Above ₹30,000", value: "above-30000", min: 30000, max: Infinity },
    ];
    const packageTypes = ["Solo", "Couple", "Group"];

    const filteredPackages = packages.filter((pkg) => {
        const searchText = searchTerm.trim().toLowerCase();
        const searchableText = [pkg.name, pkg.description, pkg.location?.name, ...(pkg.destinations || [])].filter(Boolean).join(" ").toLowerCase();
        const packagePrice = Number(pkg.price?.discounted || 0);
        const packageType = pkg.type || pkg.packageType || pkg.travelType;
        const selectedRange = priceRanges.find((range) => range.value === selectedPrice);

        return (
            (!searchText || searchableText.includes(searchText)) &&
            (selectedState === "all" || pkg.location?.name === selectedState) &&
            (!selectedRange || (packagePrice >= selectedRange.min && packagePrice < selectedRange.max)) &&
            (selectedType === "all" || packageType?.toLowerCase() === selectedType.toLowerCase())
        );
    });

    const sortPackages = (e) => {
        const value = e.target.value;
        setSortBy(value);
        console.log(sortBy);
        if (value === "price") {
            packages.sort((a, b) => a.price.discounted - b.price.discounted);
        } else if (value === "latest") {
            packages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    };

    const reverse = (pkg) => {
        setPackages(pkg.toReversed());
    };

    const hasActiveFilters = searchTerm || selectedState !== "all" || selectedPrice !== "all" || selectedType !== "all";

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedState("all");
        setSelectedPrice("all");
        setSelectedType("all");
    };

    return (
        <main className="pb-16 min-h-screen bg-paper select-none overflow-x-clip">
            <div className="relative w-full h-screen min-h-[700px] flex flex-col justify-center overflow-hidden bg-ink">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full">
                        <img src={coverImage} alt="Cover" className="bg-breathe w-full h-full object-cover opacity-80 inset-0" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 mix-blend-multiply"></div>
                    </div>
                </div>

                <div
                    data-aos="fade-up"
                    className="relative z-10 max-w-[1200px] w-full pt-16 mx-auto px-4 sm:px-6 md:px-8 mb-10 text-center md:text-left">
                    <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-rust mt-6 block">Curated journeys</span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.05] tracking-[-0.01em] mb-6 text-rust">
                        Find the route
                        <br />
                        <span className="italic text-zinc-200">that feels like yours.</span>
                    </h1>
                    <p className="font-sans text-sm sm:text-base text-white/80 max-w-lg leading-relaxed md:ml-0 mx-auto">
                        Browse handpicked escapes by destination, budget, or travel style. Every route includes thoughtful stays, local transfers, and
                        a dedicated trip coordinator.
                    </p>
                </div>
            </div>

            <div data-aos="fade-up" className="max-w-[1200px] mx-auto my-8 px-4 md:px-8 flex flex-col lg:flex-row gap-10 md:gap-12 relative">
                <h2 className="text-3xl text-rust">All Packages</h2>
            </div>

            <div data-aos="fade-up" className="max-w-[1200px] mx-auto px-4 md:px-8 mb-10">
                <div className="bg-paper-dim border border-zinc-200 p-4 md:p-5 rounded-md">
                    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3">
                        <label className="relative lg:col-span-1">
                            <span className="sr-only">Search packages</span>
                            <svg
                                className="absolute left-3 top-3.5 text-zinc-400"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-4-4" />
                            </svg>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search journeys"
                                className="w-full bg-paper border border-zinc-200 rounded-md pl-10 pr-3 py-3 text-sm text-ink placeholder:text-zinc-400 focus:outline-none focus:border-ink"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={() => setFiltersOpen((isOpen) => !isOpen)}
                            className="lg:hidden w-full border border-zinc-200 rounded-md px-3 py-3 text-sm text-ink flex items-center justify-between hover:border-ink transition-colors">
                            <span className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 6h16M7 12h10M10 18h4" />
                                </svg>
                                Filters
                            </span>
                            <span className="text-xs text-zinc-400">{filtersOpen ? "Hide" : "Show"}</span>
                        </button>

                        <div className={`${filtersOpen ? "flex" : "hidden"} flex-col lg:contents gap-3`}>
                            <label>
                                <span className="sr-only">Filter by state or destination</span>
                                <select
                                    value={selectedState}
                                    onChange={(event) => setSelectedState(event.target.value)}
                                    className="w-full appearance-none bg-paper border border-zinc-200 rounded-md px-3 py-3 text-sm text-ink focus:outline-none focus:border-ink">
                                    <option value="all">All destinations</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="sr-only">Filter by price range</span>
                                <select
                                    value={selectedPrice}
                                    onChange={(event) => setSelectedPrice(event.target.value)}
                                    className="w-full appearance-none bg-paper border border-zinc-200 rounded-md px-3 py-3 text-sm text-ink focus:outline-none focus:border-ink">
                                    <option value="all">All prices</option>
                                    {priceRanges.map((range) => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="sr-only">Filter by package type</span>
                                <select
                                    value={selectedType}
                                    onChange={(event) => setSelectedType(event.target.value)}
                                    className="w-full appearance-none bg-paper border border-zinc-200 rounded-md px-3 py-3 text-sm text-ink focus:outline-none focus:border-ink">
                                    <option value="all">All travel styles</option>
                                    {packageTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="relative">
                                <span className="sr-only">Sort by</span>
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-3 top-3.5 text-zinc-400 cursor-pointer"
                                    onClick={() => reverse(filteredPackages)}>
                                    <path
                                        d="M8 3.5L8 16.5M8 3.5L3.5 7.83333M8 3.5L12.5 7.83333"
                                        stroke="#9f9fa9"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M17 20.5L17 7.5M17 20.5L21.5 16.1667M17 20.5L12.5 16.1667"
                                        stroke="#9f9fa9"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <select
                                    value={sortBy}
                                    onChange={sortPackages}
                                    className="w-full appearance-none bg-paper border border-zinc-200 rounded-md px-3 py-3 text-sm text-ink focus:outline-none focus:border-ink">
                                    <option value="none" disabled>
                                        Sort by
                                    </option>
                                    {sortType.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500">
                        <span>
                            {loading
                                ? "Loading journeys..."
                                : `${filteredPackages.length} ${filteredPackages.length === 1 ? "journey" : "journeys"} found`}
                        </span>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="self-start sm:self-auto uppercase tracking-widest text-rust hover:text-ink transition-colors">
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div data-aos="fade-up" className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {error ? (
                    <div className="col-span-full border border-rust/30 bg-white px-6 py-10 md:px-10 md:py-12 text-center select-none">
                        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 text-red-500">
                            <span className="text-2xl" aria-hidden="true">
                                !
                            </span>
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-rust mb-3">Unable to load packages</p>
                        <h3 className="text-2xl md:text-3xl text-ink mb-3">The departure board is taking a pause.</h3>
                        <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-500">{error}</p>
                        <button
                            type="button"
                            onClick={retry}
                            disabled={loading}
                            className="btn btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-50">
                            {loading ? "Retrying..." : "Try again"}
                        </button>
                    </div>
                ) : loading ? (
                    Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <div data-aos="fade-up" key={i}>
                                <SkeletonPackageCard />
                            </div>
                        ))
                ) : filteredPackages.length > 0 ? (
                    filteredPackages.map((p) => (
                        <div data-aos="fade-up" key={p._id}>
                            <PackageCard pkg={p} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full border border-zinc-200 bg-white px-6 py-12 text-center">
                        <h3 className="text-2xl text-ink mb-2">No journeys match those filters.</h3>
                        <p className="text-sm text-zinc-500 mb-5">Try a broader search or clear one of the filters.</p>
                        <button type="button" onClick={resetFilters} className="btn btn-secondary">
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 mt-12">
                {[1, 2, 3, 4].map((n) => (
                    <button
                        key={n}
                        className={`w-12 h-12 rounded-full font-mono text-sm transition-colors ${activePage === n ? "bg-ink text-white" : "bg-transparent border border-zinc-200 text-zinc-500 hover:border-ink hover:text-ink"}`}
                        onClick={() => setActivePage(n)}>
                        {n}
                    </button>
                ))}
            </div> */}
        </main>
    );
}
