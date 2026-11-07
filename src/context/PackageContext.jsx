import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";
import { getDestinations } from "../services/destination.services";
import { initialize } from "../services/initial.services";

const PackageContext = createContext();

function normalizePackage(pkg) {
    if (!pkg) return null;
    const actual = Number(pkg.price?.actual ?? pkg.price?.originalPrice ?? 0);
    const discounted = Number(pkg.price?.discounted ?? pkg.price?.discountedPrice ?? actual);
    const imgUrl =
        typeof pkg.img === "string"
            ? pkg.img
            : pkg.img?.url ||
              (pkg.images && typeof pkg.images[0] === "string" ? pkg.images[0] : pkg.images?.[0]?.url) ||
              "";

    return {
        ...pkg,
        _id: pkg._id || pkg.id || pkg.slug,
        id: pkg.id || pkg.slug || pkg._id,
        slug: pkg.slug || pkg.id || String(pkg._id || ""),
        name: pkg.name || "",
        description: pkg.description || "",
        location: pkg.location || {},
        duration: pkg.duration || { days: 0, nights: 0 },
        price: {
            currency: pkg.price?.currency || "INR",
            symbol: pkg.price?.symbol || "₹",
            actual,
            discounted,
        },
        img: typeof pkg.img === "object" && pkg.img?.url ? pkg.img : (imgUrl ? { url: imgUrl } : null),
        images: Array.isArray(pkg.images) && pkg.images.length > 0
            ? pkg.images.map((im) => (typeof im === "string" ? { url: im } : im))
            : (imgUrl ? [{ url: imgUrl }] : []),
        destinations: Array.isArray(pkg.destinations) && pkg.destinations.length > 0
            ? pkg.destinations
            : Array.isArray(pkg.places) && pkg.places.length > 0
            ? pkg.places
            : (pkg.location?.name ? [pkg.location.name] : []),
        inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
        exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
        itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : []
    };
}

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const vId = typeof localStorage !== "undefined" ? localStorage.getItem("v_id") : null;
            if (!vId) {
                try {
                    const init = await initialize(vId);
                    if (init?.v_id && typeof localStorage !== "undefined") {
                        localStorage.setItem("v_id", init.v_id);
                    }
                } catch {
                    // Ignore tracking error
                }
            }

            const [packagesData, destinationData] = await Promise.allSettled([
                getAllPackages(),
                getDestinations(),
            ]);

            if (packagesData.status === "fulfilled" && Array.isArray(packagesData.value?.packages)) {
                setPackages(packagesData.value.packages.map(normalizePackage));
            } else {
                setPackages([]);
                if (packagesData.status === "rejected") {
                    const rawReason = packagesData.reason?.response?.data?.message || packagesData.reason?.message || "";
                    const friendlyMessage =
                        !rawReason || /status code/i.test(rawReason) || /request failed/i.test(rawReason) || /network error/i.test(rawReason)
                            ? "Unable to load tour packages right now. Please try again shortly."
                            : rawReason;
                    setError(friendlyMessage);
                }
            }

            if (destinationData.status === "fulfilled" && Array.isArray(destinationData.value?.destinations)) {
                setDestinations(destinationData.value.destinations);
            } else {
                setDestinations([]);
            }
        } catch (err) {
            console.error("Backend connection error:", err.message);
            const raw = err?.response?.data?.message || err?.message || "";
            const friendly =
                !raw || /status code/i.test(raw) || /request failed/i.test(raw) || /network error/i.test(raw)
                    ? "Unable to connect to the server right now. Please try again shortly."
                    : raw;
            setError(friendly);
            setPackages([]);
            setDestinations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <PackageContext.Provider value={{ packages, destinations, setPackages, loading, error, retry: fetch }}>
            {children}
        </PackageContext.Provider>
    );
};

export const usePackages = () => {
    const context = useContext(PackageContext);
    if (!context) {
        return {
            packages: [],
            destinations: [],
            loading: false,
            error: null,
            setPackages: () => {},
            retry: () => {}
        };
    }
    return context;
};
