import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FileCheck2,
    CalendarCheck,
    CreditCard,
    AlertTriangle,
    Shield,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    HelpCircle,
    Compass,
} from "lucide-react";
import coverImage from "../assets/contact-cover.png";
import { countPagevisit } from "../services/initial.services";

export default function TermsConditions() {
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

    return (
        <main className="min-h-screen bg-slate-50 pb-16 sm:pb-20 select-none overflow-x-hidden">
            {/* HERO HEADER */}
            <div className="relative w-full min-h-[300px] xs:min-h-[340px] sm:min-h-[380px] flex items-center justify-center py-12 xs:py-14 sm:py-16 px-3.5 sm:px-6 md:px-8 bg-slate-950 overflow-hidden">
                <img
                    src={coverImage}
                    alt="Himalayan Mountain Path"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 bg-breathe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-3 sm:mb-4">
                        <FileCheck2 size={14} className="text-sky-400 shrink-0" />
                        <span>Booking Agreement</span>
                    </div>
                    <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Terms & Conditions
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                        Please review these clear terms before booking your holiday package with Prime Traveller.
                    </p>
                    <span className="inline-block mt-3 text-[11px] text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        Last Updated: November 2026 · Prime Traveller Official Travel Policy
                    </span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-[1000px] mx-auto px-3.5 sm:px-6 md:px-8 -mt-6 sm:-mt-8 relative z-20 flex flex-col gap-6 sm:gap-8">
                {/* 1. Acceptance of Terms */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <Compass size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            1. Acceptance of Terms
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        By visiting <span className="font-semibold text-slate-800">primetraveller.in</span> or requesting a tour plan, you agree to these Terms and Conditions. These terms apply to all website visitors, travel planners, and guests traveling on our tour packages.
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        To submit an enquiry or book a tour package, you must be at least 18 years old or have permission from a parent or legal guardian.
                    </p>
                </div>

                {/* 2. Nature of the Website & Enquiries */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <HelpCircle size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            2. Website Nature & Enquiry Process
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        Our website is an informational and tour inquiry platform:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside mb-4">
                        <li>Submitting an enquiry form on our website does <strong>not</strong> create a binding contract or confirm a booking.</li>
                        <li>No online payment is collected on the website. After you submit an enquiry, our local travel desk contacts you directly via call or WhatsApp.</li>
                        <li>We discuss your specific dates, room categories, passenger count, and vehicle choice to provide an exact written proposal.</li>
                    </ul>
                    <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-900 text-xs font-medium">
                        ℹ️ <strong>Booking Confirmation:</strong> Your tour is confirmed only after you accept the written itinerary and pay the agreed advance booking deposit.
                    </div>
                </div>

                {/* 3. Pricing, Itineraries & Mountain Conditions */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <CalendarCheck size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            3. Pricing & Itineraries
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        Package prices listed on the website are indicative starting rates based on standard seasonal tariffs:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                        <li>Final pricing may vary depending on peak holiday seasons (such as Durga Puja, Christmas, and May-June peak summers), chosen vehicle type (Innova, Scorpio, or standard SUV), and hotel category.</li>
                        <li>In mountainous regions like Sikkim and Darjeeling, road routes and sightseeing spots are subject to weather, snowfall, and landslide conditions.</li>
                        <li>If a specific mountain pass (such as Nathula Pass or Zero Point) is closed by army or state administration, our driver will arrange safe alternate sightseeing where possible.</li>
                    </ul>
                </div>

                {/* 4. Payments, Cancellations & Refunds */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <CreditCard size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            4. Payment & Cancellation Policy
                        </h2>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        Advance payment terms and tour bookings are managed directly by the owner of Prime Traveller:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs text-slate-700">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="block text-slate-900 mb-1">Advance Deposit</strong>
                            <span>An initial deposit is required upon booking confirmation to secure private vehicles, local chauffeurs, and hotel rooms.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="block text-slate-900 mb-1">Balance Settlement</strong>
                            <span>The remaining balance amount must be settled as agreed in your written booking confirmation.</span>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">
                            Cancellation & Refund Policy
                        </h3>
                        <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                            <li>All cancellation requests, reschedule requests, and refund eligibility depend entirely upon the discretion and decision of the owner of Prime Traveller.</li>
                            <li>Because mountain tours require advance commitments to local hill drivers, homestays, hotels, and government permit authorities, cancellation terms are determined case-by-case based on your travel dates, travel season, and incurred vendor costs.</li>
                            <li>The final decision regarding any refund percentage, credit note, or rescheduling rests solely with the owner.</li>
                            <li>To request a cancellation or change in itinerary dates, travelers must contact the owner or travel desk directly by phone or email.</li>
                        </ul>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        <strong>Natural Events & Road Blockages (Force Majeure):</strong> If a journey cannot take place due to extreme landslides, severe snowfall, government permit closures, or natural hazards, the owner will discuss alternate dates, modified routes, or applicable refunds on a case-by-case basis.
                    </p>
                </div>

                {/* 5. Permits & Traveler IDs */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <Shield size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            5. Travel Documents & Permits
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        Certain Himalayan border destinations (including North Sikkim, Tsomgo Lake, and Nathula Pass) fall under protected area regulations:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                        <li>Every guest must carry original government photo ID (Voter ID, Passport, or Driving License) and passport-sized photographs.</li>
                        <li>Prime Traveller assists in submitting and processing tourist permits with police and army checkpoints. However, permit approval rests solely with government authorities.</li>
                        <li>Foreign nationals require special Inner Line Permits (ILP) and must carry valid Indian Visas.</li>
                    </ul>
                </div>

                {/* 6. Health, Safety & Conduct */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <AlertTriangle size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            6. Health & Mountain Safety
                        </h2>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                        <li>High altitude areas (such as Gurudongmar Lake at 17,800 ft) may cause mild altitude sickness. Guests with heart or respiratory conditions should consult their doctor before booking.</li>
                        <li>For your safety, travelers must respect the driving recommendations of our experienced local mountain chauffeurs and follow local eco-tourism rules.</li>
                        <li>Disorderly, abusive, or illegal conduct may result in termination of tour services without a refund.</li>
                    </ul>
                </div>

                {/* 7. Limitation of Liability */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        7. Limitation of Liability
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        Prime Traveller operates as an experienced tour organizer coordinating private vehicle transfers, homestays, hotels, and permits:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside mb-3">
                        <li>We are not responsible for delays, missed flights, or missed trains caused by road traffic, flight cancellations, railway rescheduling, or mountain weather conditions.</li>
                        <li>Travelers are solely responsible for their personal belongings, luggage, electronics, and cash.</li>
                        <li>We strongly recommend that all travelers purchase comprehensive personal travel insurance before their journey.</li>
                    </ul>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        To the extent permitted by law, Prime Traveller's maximum liability is strictly limited to the amount paid by the customer for the specific tour package.
                    </p>
                </div>

                {/* 8. Intellectual Property & Governing Law */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        8. Governing Law & Jurisdiction
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-2">
                        All website content, tour designs, itineraries, logos, and written materials on <span className="font-semibold text-slate-800">primetraveller.in</span> are the property of Prime Traveller.
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        These Terms and Conditions are governed by the laws of India. Any disputes shall be resolved amicably through mutual discussion or through the competent courts of Dhanbad, Jharkhand.
                    </p>
                </div>

                {/* 9. Contact Desk */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        9. Contact Information
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        If you have any questions regarding these Terms & Conditions or your booking, please reach out to us:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                            <MapPin size={16} className="text-sky-600 mt-0.5 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Office Location</strong>
                                <span className="text-slate-600">Maithon, Dhanbad, Jharkhand, India · 828207</span>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                            <Phone size={16} className="text-sky-600 mt-0.5 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Phone & WhatsApp</strong>
                                <a href="tel:+919142234213" className="text-sky-600 font-semibold hover:underline">
                                    +91 91422 34213
                                </a>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                            <Mail size={16} className="text-sky-600 mt-0.5 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Email Address</strong>
                                <a href="mailto:primetraveler2773@gmail.com" className="text-sky-600 font-semibold hover:underline truncate block">
                                    primetraveler2773@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home / Packages Links */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                    <Link to="/privacy-policy" className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1.5">
                        <span>Read Privacy Policy</span>
                        <ArrowRight size={14} />
                    </Link>
                    <Link to="/contact" className="btn btn-primary text-xs sm:text-sm">
                        Plan a Tour with Us
                    </Link>
                </div>
            </div>
        </main>
    );
}
