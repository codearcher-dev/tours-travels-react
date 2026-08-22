import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-ink text-white pt-10 md:pt-16 pb-8 overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8 mb-2">
                    <div className="lg:col-span-5 flex flex-col justify-between md:col-span-2 select-none">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <img src={logo} alt="Prime Traveller Logo" className="h-16 md:h-24" />
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
                                    Prime
                                    <br />
                                    <span className="text-gold italic">Traveller.</span>
                                </h2>
                            </div>
                            <p className="text-zinc-400 text-lg max-w-md font-sans font-light leading-relaxed">
                                Hand-plotted tour itineraries across the globe. Route design, ground logistics and traveler support, handled with
                                care.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2 lg:mb-6 select-none">Explore</h3>
                        <ul className="flex lg:flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li>
                                <Link to="/" className="hover:text-gold transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/packages" className="hover:text-gold transition-colors">
                                    Packages
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gold transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-gold transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 select-none">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2 lg:mb-6">Destinations</h3>
                        <ul className="flex lg:flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li>
                                <span className="cursor-pointer hover:text-gold transition-colors">North Sikkim</span>
                            </li>
                            <li>
                                <span className="cursor-pointer hover:text-gold transition-colors">Darjeeling</span>
                            </li>
                            <li>
                                <span className="cursor-pointer hover:text-gold transition-colors">Gangtok</span>
                            </li>
                            <li>
                                <span className="cursor-pointer hover:text-gold transition-colors">Mirik</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3 select-none">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2 lg:mb-6">Studio</h3>
                        <ul className="flex lg:flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li>Maithon, Dhanbad</li>
                            <li>Jharkhand, India</li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2 lg:mb-6 select-none">Contact</h3>
                        <ul className="flex lg:flex-col gap-4 font-sans text-sm text-zinc-300">
                            <li className="">
                                <a href="mailto:primetraveller2773@gmail.com" className="hover:text-gold transition-colors">
                                    primetraveler2773@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+919142234213">+91 91422 34213</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-widest text-zinc-600 uppercase">
                    <span>© {new Date().getFullYear()} Prime Traveller</span>
                    <div className="flex gap-6">
                        <span className="cursor-pointer hover:text-zinc-400">
                            <a href="https://www.instagram.com/prime_traveller_india" target="_blank">
                                Instagram
                            </a>
                        </span>
                        <span className="cursor-pointer hover:text-zinc-400">Twitter</span>
                        <span className="cursor-pointer hover:text-zinc-400">Journal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
