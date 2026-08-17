import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
// import packages from "../data/packages";
import PackageCard from "../components/PackageCard";
import { usePackages } from "../context/PackageContext";
import SkeletonPackageCard from "../components/ui/loading-state/SkeletonPackageCard";

const filters = ["All", "Asia", "Europe", "Americas", "Africa", "Under 7 Days", "Under ₹80,000"];

export default function Packages() {
    const { packages, loading } = usePackages();
    const containerRef = useRef(null);
    useScrollReveal(containerRef);

    const [activeFilter, setActiveFilter] = useState("All");
    const [activePage, setActivePage] = useState(1);

    return (
        <main ref={containerRef} className="page-fade">
            <div className="max-w-[1200px] mx-auto pt-[56px] px-8 pb-5">
                <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> ALL PACKAGES
                </span>
                <h1 className="font-display text-[clamp(40px,5.4vw,68px)] font-medium leading-[1.04] tracking-[-0.01em]">
                    Forty routes.
                    <br />
                    One departure board.
                </h1>
                <p>
                    Filter by continent, budget or trip length — every package below includes stays, local transfers and a dedicated trip coordinator.
                </p>
            </div>

            <div className="max-w-[1200px] mx-auto px-8 pb-7 flex gap-3.5 flex-wrap items-center border-b border-line"></div>

            <div className="max-w-[1200px] mx-auto mt-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {packages.map((p, i) =>
                    loading ? <SkeletonPackageCard /> : <PackageCard key={p.id} pkg={p} revealDelay={`${Math.min(i * 0.08, 1.2)}s`} />,
                )}
            </div>

            <div className="flex justify-center gap-2.5 pt-[50px] px-8 pb-[80px]">
                {[1, 2, 3, 4].map((n) => (
                    <button key={n} className={activePage === n ? "active" : ""} onClick={() => setActivePage(n)}>
                        {n}
                    </button>
                ))}
            </div>
        </main>
    );
}
