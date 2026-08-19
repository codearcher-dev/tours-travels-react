import icon from "../assets/whatsapp-icon.png";
export default function WhatsAppSticky() {
    const phoneNumber = "919142234213";
    const message = encodeURIComponent("Hello! I'm interested in booking a journey with Prime Traveller.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[100] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Chat on WhatsApp">
            <img src={icon} alt="" className="w-12 h-12" />
        </a>
    );
}
