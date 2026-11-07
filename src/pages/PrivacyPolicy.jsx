import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Lock,
    Eye,
    Database,
    FileText,
    UserCheck,
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    Server,
} from "lucide-react";
import coverImage from "../assets/about-cover.png";
import { countPagevisit } from "../services/initial.services";

export default function PrivacyPolicy() {
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
                    alt="Mountain Landscape"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 bg-breathe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-3 sm:mb-4">
                        <ShieldCheck size={14} className="text-sky-400 shrink-0" />
                        <span>Legal & Transparency</span>
                    </div>
                    <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                        How Prime Traveller collects, uses, and safeguards your personal information when you visit our website or plan a trip with us.
                    </p>
                    <span className="inline-block mt-3 text-[11px] text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        Last Updated: November 2026 · Digital Personal Data Protection (DPDP) Act Compliant
                    </span>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-[1000px] mx-auto px-3.5 sm:px-6 md:px-8 -mt-6 sm:-mt-8 relative z-20 flex flex-col gap-6 sm:gap-8">
                {/* 1. Introduction */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <Eye size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            1. Introduction & Our Commitment
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        Prime Traveller ("we", "us", or "our") is an authorized tour operating company based in Maithon, Dhanbad, Jharkhand, India. We operate the website <span className="font-semibold text-slate-800">primetraveller.in</span>.
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        We value your trust and are committed to protecting your privacy. This policy explains what details we collect when you use our website, why we collect them, and how your information is kept safe in accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India.
                    </p>
                </div>

                {/* 2. Information We Collect */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <FileText size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            2. Information We Collect
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                            <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">
                                A. Information You Provide to Us
                            </h3>
                            <ul className="text-xs text-slate-600 leading-relaxed space-y-1.5 list-disc list-inside">
                                <li><strong>Full Name & Contact Details:</strong> Name, phone number, and email address submitted in enquiry forms.</li>
                                <li><strong>Tour Requirements:</strong> Package of interest, destination stops, travel dates, and vehicle preferences.</li>
                                <li><strong>Group Details:</strong> Number of adult travelers and accompanying children.</li>
                                <li><strong>Customer Reviews:</strong> Name, journey ratings, and feedback comments submitted via our secure post-tour review links.</li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                            <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">
                                B. Information Collected Automatically
                            </h3>
                            <ul className="text-xs text-slate-600 leading-relaxed space-y-1.5 list-disc list-inside">
                                <li><strong>Anonymous Visitor ID (<code className="text-sky-700 bg-sky-50 px-1 py-0.5 rounded">v_id</code>):</strong> A random, anonymous identifier stored locally in your browser to count unique daily visits without tracking personal identity.</li>
                                <li><strong>Page View Metrics:</strong> Total page visits to monitor server performance and popular tour categories.</li>
                                <li><strong>WhatsApp Click Counts:</strong> Internal count of how many travelers choose to start a WhatsApp conversation.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. How We Use Your Information */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <Database size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            3. How We Use Your Information
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        We only use your personal data for legitimate travel planning purposes:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside mb-4">
                        <li>To reply to your tour enquiries with accurate pricing, vehicle options, and itineraries.</li>
                        <li>To reserve rooms with verified local hotels and homestays on your behalf.</li>
                        <li>To arrange dedicated local drivers, private mountain vehicles, and required travel permits.</li>
                        <li>To improve our tour services based on genuine customer feedback.</li>
                    </ul>
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                        ✓ <strong>No Sale of Data:</strong> We never sell, rent, or trade your personal information to third parties, advertising brokers, or marketing networks.
                    </div>
                </div>

                {/* 4. Third-Party Services & Integrations */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <Server size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            4. Third-Party Services
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        To operate our website securely and deliver your tour services, we work with standard cloud service providers:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                            <strong className="text-slate-900 block mb-1">Database & Cloud Storage</strong>
                            <span>MongoDB Atlas securely stores enquiry and feedback records with encrypted access.</span>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                            <strong className="text-slate-900 block mb-1">Image Content Network (CDN)</strong>
                            <span>Cloudinary hosts destination and package photographs. No user personal data is shared with Cloudinary.</span>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                            <strong className="text-slate-900 block mb-1">Operational Push Alerts</strong>
                            <span>Firebase Cloud Messaging sends instantaneous new enquiry alerts to our internal admin devices.</span>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                            <strong className="text-slate-900 block mb-1">WhatsApp Communication</strong>
                            <span>When you click our WhatsApp button, your conversation occurs on WhatsApp, governed by Meta's privacy policy.</span>
                        </div>
                    </div>
                </div>

                {/* 5. Data Security & Storage */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <Lock size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            5. Data Security & Retention
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        We apply strong safeguards to protect your personal details:
                    </p>
                    <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                        <li><strong>HTTPS Encryption:</strong> All information passed between your browser and our server is encrypted using standard TLS protocols.</li>
                        <li><strong>Restricted Access:</strong> Only authorized travel operators have access to enquiry records.</li>
                        <li><strong>Retention Period:</strong> Enquiry records are retained only for as long as necessary to complete your travel booking and comply with Indian legal and tax requirements.</li>
                    </ul>
                </div>

                {/* 6. Your Rights Under DPDP Act 2023 */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                            <UserCheck size={20} />
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                            6. Your Privacy Rights
                        </h2>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                        Under India's Digital Personal Data Protection Act, 2023, you have clear rights regarding your personal information:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 mb-4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="block text-slate-900 mb-0.5">Right to Access</strong>
                            <span>You can ask what personal details we hold about you.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="block text-slate-900 mb-0.5">Right to Correction</strong>
                            <span>You can request correction of any inaccurate or outdated information.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="block text-slate-900 mb-0.5">Right to Erasure</strong>
                            <span>You can request that we permanently delete your contact and enquiry details.</span>
                        </div>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        To exercise any of these rights, email us at <a href="mailto:primetraveler2773@gmail.com" className="text-sky-600 font-semibold underline">primetraveler2773@gmail.com</a>. We acknowledge all requests within 48 to 72 hours.
                    </p>
                </div>

                {/* 7. Children's Privacy */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-2">
                        7. Children's Information
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Our website is not designed for children under 18 years of age. When an adult traveler submits passenger counts that include children, that data is provided voluntarily by the parent or guardian solely for vehicle seat planning and hotel bed arrangements.
                    </p>
                </div>

                {/* 8. Contact & Grievance Officer */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-2">
                        8. Contact & Grievance Redressal
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        If you have questions, feedback, or grievances regarding this Privacy Policy or your personal information, please contact our travel desk:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                            <MapPin size={16} className="text-sky-600 mt-0.5 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Office Address</strong>
                                <span className="text-slate-600">Maithon, Dhanbad, Jharkhand, India · 828207</span>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                            <Phone size={16} className="text-sky-600 mt-0.5 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Direct Desk Phone</strong>
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
                    <Link to="/terms-and-conditions" className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1.5">
                        <span>Read Terms & Conditions</span>
                        <ArrowRight size={14} />
                    </Link>
                    <Link to="/packages" className="btn btn-primary text-xs sm:text-sm">
                        Explore Tour Packages
                    </Link>
                </div>
            </div>
        </main>
    );
}
