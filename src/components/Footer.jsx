import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-ink text-white pt-10 md:pt-16 pb-8 overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
                    
                    <div className="lg:col-span-5 flex flex-col justify-between md:col-span-2 lg:col-span-5">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <img src={logo} alt="Prime Traveller Logo" className="h-10 md:h-12 invert" />
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">Prime<br/><span className="text-gold italic">Traveller.</span></h2>
                            </div>
                            <p className="text-zinc-400 text-lg max-w-md font-sans font-light leading-relaxed">
                                Hand-plotted tour itineraries across the globe. Route design, ground logistics and traveler support, handled with care.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6">Explore</h3>
                        <ul className="flex flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
                            <li><Link to="/packages" className="hover:text-gold transition-colors">Journeys</Link></li>
                            <li><Link to="/about" className="hover:text-gold transition-colors">Story</Link></li>
                            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6">Destinations</h3>
                        <ul className="flex flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li><span className="cursor-pointer hover:text-gold transition-colors">Bali, IDN</span></li>
                            <li><span className="cursor-pointer hover:text-gold transition-colors">Santorini, GRC</span></li>
                            <li><span className="cursor-pointer hover:text-gold transition-colors">Kyoto, JPN</span></li>
                            <li><span className="cursor-pointer hover:text-gold transition-colors">Reykjavik, ISL</span></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6">Studio</h3>
                        <ul className="flex flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li>4th Floor, Meridian House</li>
                            <li>Bengaluru, India</li>
                            <li className="mt-4"><a href="mailto:fly@meridianjourneys.com" className="hover:text-gold transition-colors">fly@meridianjourneys.com</a></li>
                            <li>+91 98765 43210</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-zinc-600 uppercase">
                    <span>© {new Date().getFullYear()} Meridian Journeys</span>
                    <div className="flex gap-6">
                        <span className="cursor-pointer hover:text-zinc-400">Instagram</span>
                        <span className="cursor-pointer hover:text-zinc-400">Twitter</span>
                        <span className="cursor-pointer hover:text-zinc-400">Journal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
