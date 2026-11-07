import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function WhatsAppSticky() {
    let isPackageDetail = false;
    try {
        const location = useLocation();
        isPackageDetail = location?.pathname?.startsWith("/package/");
    } catch {
        // Fallback if rendered outside Router (e.g. in isolated tests)
    }

    const phoneNumber = "919142234213";
    const message = encodeURIComponent(
        "Hello Prime Traveller team! I am exploring your website and would love details regarding upcoming tour packages."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <aside
            aria-label="Direct WhatsApp Contact"
            className={`${isPackageDetail ? "hidden lg:block" : "block"} fixed bottom-5 right-3.5 sm:bottom-8 sm:right-8 z-40`}>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 whatsapp-sticky"
                aria-label="Chat directly on WhatsApp with Prime Traveller">
                <MessageCircle size={22} className="sm:w-6 sm:h-6 shrink-0" />
                <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide uppercase pr-1">
                    Chat with Us
                </span>

                {/* Mobile ping pulse */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
            </a>
        </aside>
    );
}
