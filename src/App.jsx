import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PackageDetail from "./pages/PackageDetail";
import WhatsAppSticky from "./components/WhatsAppSticky";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);
    return null;
}

export default function App() {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }, []);

    useEffect(() => {
        // Refresh AOS on every route change
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }, [location.pathname]);

    return (
        <>
            <ScrollToTop />
            <Navbar />
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/package/:slug" element={<PackageDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            <Footer />
            <WhatsAppSticky />
        </>
    );
}
