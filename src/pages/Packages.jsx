import { useState } from "react";
import PackageCard from "../components/PackageCard";
import { usePackages } from "../context/PackageContext";
import SkeletonPackageCard from "../components/ui/loading-state/SkeletonPackageCard";

export default function Packages() {
    const { packages, loading } = usePackages();
    const [activePage, setActivePage] = useState(1);

    return (
        <main className="pt-20 pb-16 min-h-screen bg-paper">
            <div data-aos="fade-up" className="max-w-[1200px] mx-auto px-4 md:px-8 mb-10 text-center md:text-left">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-6 block">The Collection</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-medium mb-6">
                    Forty routes.
                    <br />
                    <span className="italic text-zinc-400">One departure board.</span>
                </h1>
                <p className="font-sans text-zinc-500 max-w-lg leading-relaxed md:ml-0 mx-auto">
                    Filter by continent, budget or trip length — every journey below includes handpicked stays, local transfers, and a dedicated trip
                    coordinator.
                </p>
            </div>

            <div data-aos="fade-up" className="max-w-[1200px] mx-auto mb-8 px-4 md:px-8 flex flex-col lg:flex-row gap-10 md:gap-12 relative">
                <h2 className="font-display text-3xl text-rust">All Packages</h2>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading
                    ? Array(6)
                          .fill(0)
                          .map((_, i) => (
                              <div data-aos="fade-up" data-aos-delay={i * 100} key={i}>
                                  <SkeletonPackageCard />
                              </div>
                          ))
                    : packages.map((p, i) => (
                          <div data-aos="fade-up" data-aos-delay={i * 100} key={p._id}>
                              <PackageCard pkg={p} />
                          </div>
                      ))}
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 mt-12">
                {[1, 2, 3, 4].map((n) => (
                    <button
                        key={n}
                        className={`w-12 h-12 rounded-full font-mono text-sm transition-colors ${activePage === n ? "bg-ink text-white" : "bg-transparent border border-zinc-200 text-zinc-500 hover:border-ink hover:text-ink"}`}
                        onClick={() => setActivePage(n)}>
                        {n}
                    </button>
                ))}
            </div>
        </main>
    );
}
