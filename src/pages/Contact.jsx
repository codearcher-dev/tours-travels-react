import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
    const containerRef = useRef(null);
    useScrollReveal(containerRef);

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main ref={containerRef} className="page-fade">
            <div className="max-w-[1200px] mx-auto pt-[60px] px-8 pb-[90px] grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="">
                    <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
                        <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> GET IN TOUCH
                    </span>
                    <h1 className="font-display text-[clamp(40px,5.4vw,68px)] font-medium leading-[1.04] tracking-[-0.01em]">
                        Tell us your
                        <br />
                        dream coordinates.
                    </h1>
                    <p className="mt-6 text-[17px] text-ink-soft max-w-[460px] leading-[1.65]">
                        Send an enquiry and a route specialist replies within one working day with a tailored quote — no obligation, no spam.
                    </p>

                    <div className="flex gap-4 items-start py-[18px] border-t border-line">
                        <svg
                            className="w-[22px] h-[22px] text-teal shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z" />
                        </svg>
                        <div>
                            <div className="text-[11px] uppercase text-ink-soft mb-[3px]">Call the desk</div>
                            <div className="text-[14.5px] font-medium">+91 98765 43210</div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start py-[18px] border-t border-line">
                        <svg
                            className="w-[22px] h-[22px] text-teal shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6">
                            <path d="M4 4h16v16H4V4z" />
                            <path d="M22 6l-10 7L2 6" />
                        </svg>
                        <div>
                            <div className="text-[11px] uppercase text-ink-soft mb-[3px]">Email</div>
                            <div className="text-[14.5px] font-medium">fly@meridianjourneys.com</div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start py-[18px] border-y border-line">
                        <svg
                            className="w-[22px] h-[22px] text-teal shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <div>
                            <div className="text-[11px] uppercase text-ink-soft mb-[3px]">Studio</div>
                            <div className="text-[14.5px] font-medium">4th Floor, Meridian House, Bengaluru</div>
                        </div>
                    </div>

                    <div className="map-mock mt-8 h-[180px] rounded-[3px] relative overflow-hidden border border-line">
                        <div className="absolute top-[44%] left-[52%] w-4 h-4 rounded-full bg-rust shadow-[0_0_0_6px_rgba(184,88,47,0.18)] after:content-[''] after:absolute after:-inset-[14px] after:border-[1.5px] after:border-dashed after:border-rust after:rounded-full after:ping-anim"></div>
                    </div>
                </div>

                <form className="bg-paper-dim p-8 sm:p-10 rounded-sm border border-line" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-soft mb-2">Full Name</label>
                        <input
                            className="w-full h-[50px] px-4 rounded-[3px] border border-line bg-paper focus:outline-none focus:border-teal transition-colors"
                            type="text"
                            placeholder="Rahul Vishwakarma"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-6">
                            <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-soft mb-2">Email</label>
                            <input
                                className="w-full h-[50px] px-4 rounded-[3px] border border-line bg-paper focus:outline-none focus:border-teal transition-colors"
                                type="email"
                                placeholder="you@email.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-soft mb-2">Phone</label>
                            <input
                                className="w-full h-[50px] px-4 rounded-[3px] border border-line bg-paper focus:outline-none focus:border-teal transition-colors"
                                type="tel"
                                placeholder="+91"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-6">
                            <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-soft mb-2">Destination</label>
                            <div className="relative">
                                <select className="w-full h-[50px] px-4 rounded-[3px] border border-line bg-paper focus:outline-none focus:border-teal transition-colors appearance-none">
                                    <option>Bali</option>
                                    <option>Santorini</option>
                                    <option>Kyoto</option>
                                    <option>Machu Picchu</option>
                                    <option>Marrakech</option>
                                    <option>Iceland</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-soft mb-2">Travelers</label>
                            <div className="relative">
                                <select className="w-full h-[50px] px-4 rounded-[3px] border border-line bg-paper focus:outline-none focus:border-teal transition-colors appearance-none">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3–4</option>
                                    <option>5+</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-soft mb-2">Tell us about the trip</label>
                        <textarea
                            className="w-full p-4 rounded-[3px] border border-line bg-paper focus:outline-none focus:border-teal transition-colors resize-y"
                            rows="3"
                            placeholder="Dates, budget, occasion..."></textarea>
                    </div>
                    <button className="btn btn-primary w-full sm:w-auto px-[32px] py-[16px]" type="submit">
                        {submitted ? "Enquiry Sent ✓" : "Send Enquiry"}
                        {!submitted && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
