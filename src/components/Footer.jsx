import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-ink text-paper mt-0">
            <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
                <div>
                    <Link to="/" className="flex items-center gap-2.5 text-[19px] font-semibold text-paper mb-[14px]">
                        <img src={logo} alt="" className="h-[52px] " />
                        Prime Traveller
                    </Link>
                    <p className="text-[13.5px] text-[rgba(247,244,238,0.6)] leading-[1.6] max-w-[260px]">
                        Hand-plotted tour itineraries across India. Route design, ground logistics and traveler support, in one desk.
                    </p>
                    <div className="flex mt-[14px] border-b border-[rgba(247,244,238,0.35)] pb-2">
                        <input
                            type="email"
                            placeholder="Your email for route drops"
                            className="bg-transparent border-none text-paper text-[13.5px] flex-1 outline-none font-sans placeholder-[rgba(247,244,238,0.4)]"
                        />
                        <button aria-label="Subscribe">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gold">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <div className="text-[12px] uppercase text-gold mb-4 tracking-[0.1em] font-mono">Explore</div>
                    <ul className="list-none m-0 p-0">
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            <Link to="/packages">Packages</Link>
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            <Link to="/about">About</Link>
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="text-[12px] uppercase text-gold mb-4 tracking-[0.1em] font-mono">Destinations</div>
                    <ul className="list-none m-0 p-0">
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            Bali
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            Santorini
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            Kyoto
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            Iceland
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="text-[12px] uppercase text-gold mb-4 tracking-[0.1em] font-mono">Studio</div>
                    <ul className="list-none m-0 p-0">
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            4th Floor, Meridian House
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            Bengaluru, India
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            fly@meridianjourneys.com
                        </li>
                        <li className="mb-2.5 text-[13.5px] text-[rgba(247,244,238,0.75)] transition-colors duration-200 cursor-pointer hover:text-gold">
                            +91 98765 43210
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-[rgba(247,244,238,0.14)] px-8 py-5 flex flex-col sm:flex-row justify-between max-w-[1200px] mx-auto text-[11.5px] text-[rgba(247,244,238,0.45)] uppercase">
                <span>© 2026 Prime Traveller</span>
            </div>
        </footer>
    );
}
