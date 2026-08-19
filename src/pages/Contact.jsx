import { useState } from "react";
import icon from "../assets/whatsapp-icon.png";
import { usePackages } from "../context/PackageContext";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { packages } = usePackages();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="pt-32 pb-24 min-h-screen bg-paper-dim">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* LEFT COLUMN: Title and Info */}
                    <div className="lg:col-span-5" data-aos="fade-right">
                        <div className="sticky top-32">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust mb-6 block">Contact Us</span>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 text-ink">
                                Start the
                                <br />
                                <span className="italic text-rust">conversation.</span>
                            </h1>

                            <p className="text-zinc-600 font-sans font-light leading-relaxed mb-12 max-w-sm">
                                Reach out to our travel designers for a tailored itinerary, expert guidance, or any questions about your next journey.
                            </p>

                            <div className="flex flex-col gap-8">
                                <div>
                                    <div className="text-xs uppercase text-rust font-mono tracking-widest mb-2">Call the desk</div>
                                    <a href="tel:+919876543210" className="text-xl font-medium text-ink hover:text-rust transition-colors">
                                        +91 91422 34213
                                    </a>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-rust font-mono tracking-widest mb-2">Email</div>
                                    <a
                                        href="mailto:fly@meridianjourneys.com"
                                        className="text-xl font-medium text-ink hover:text-rust transition-colors">
                                        primetraveler2773@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-rust font-mono tracking-widest mb-2">Studio</div>
                                    <div className="text-xl font-medium text-ink leading-snug">
                                        Maithon, Dhanbad
                                        <br />
                                        Jharkhand, India
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Form */}
                    <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="200">
                        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl shadow-zinc-200/50 border border-zinc-100 flex flex-col h-full justify-center">
                            <h3 className="font-display text-2xl font-medium text-ink mb-10">Send an Enquiry</h3>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                                <div className="relative mt-2">
                                    <input
                                        id="name"
                                        className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors peer placeholder-transparent"
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 -top-5 text-xs font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-ink cursor-text">
                                        Full Name
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="relative mt-2">
                                        <input
                                            id="email"
                                            className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors peer placeholder-transparent"
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-5 text-xs font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-ink cursor-text">
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative mt-2">
                                        <input
                                            id="phone"
                                            className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors peer placeholder-transparent"
                                            type="tel"
                                            placeholder="Phone Number"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute left-0 -top-5 text-xs font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-ink cursor-text">
                                            Phone Number
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="relative mt-2">
                                        <select
                                            id="destination"
                                            className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors appearance-none cursor-pointer">
                                            <option value="" disabled selected>
                                                Select Package
                                            </option>
                                            {packages.map((pkg, idx) => (
                                                <option>{pkg.name}</option>
                                            ))}
                                            {/* <option>Bali</option>
                                            <option>Santorini</option>
                                            <option>Kyoto</option>
                                            <option>Machu Picchu</option>
                                            <option>Marrakech</option>
                                            <option>Iceland</option> */}
                                        </select>
                                        <div className="absolute right-0 top-3 pointer-events-none text-zinc-400">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="relative mt-2">
                                            <input
                                                id="adults"
                                                className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors peer placeholder-transparent"
                                                type="number"
                                                min="1"
                                                placeholder="Adults"
                                            />
                                            <label
                                                htmlFor="adults"
                                                className="absolute left-0 -top-5 text-xs font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-ink cursor-text">
                                                Adults
                                            </label>
                                        </div>
                                        <div className="relative mt-2">
                                            <input
                                                id="kids"
                                                className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors peer placeholder-transparent"
                                                type="number"
                                                min="0"
                                                placeholder="Kids"
                                            />
                                            <label
                                                htmlFor="kids"
                                                className="absolute left-0 -top-5 text-xs font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-ink cursor-text">
                                                Kids
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-4">
                                    <textarea
                                        id="message"
                                        className="w-full bg-transparent border-b border-zinc-300 py-2 text-lg text-ink focus:outline-none focus:border-ink transition-colors peer placeholder-transparent resize-y"
                                        rows="3"
                                        placeholder="Tell us about the trip"></textarea>
                                    <label
                                        htmlFor="message"
                                        className="absolute left-0 -top-5 text-xs font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-ink cursor-text">
                                        Tell us about the trip (Dates, occasion, budget...)
                                    </label>
                                </div>

                                <div className="flex flex-col gap-4 mt-2">
                                    <button
                                        className="w-full bg-ink text-white py-4 px-8 font-mono text-sm uppercase tracking-widest hover:bg-rust transition-colors flex items-center justify-center gap-4 rounded-full"
                                        type="submit">
                                        {submitted ? "Enquiry Sent ✓" : "Submit Enquiry"}
                                        {!submitted && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-zinc-200 flex-1"></div>
                                        <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">Or</span>
                                        <div className="h-px bg-zinc-200 flex-1"></div>
                                    </div>

                                    <a
                                        href="https://wa.me/919876543210?text=Hello!%20I'm%20interested%20in%20booking%20a%20journey%20with%20Prime%20Traveller."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full border border-zinc-200 text-ink hover:text-gray-100 py-4 px-8 font-mono text-sm uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-4 rounded-full">
                                        Enquire via WhatsApp
                                        <img src={icon} alt="" className="w-6 h-6" />
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
