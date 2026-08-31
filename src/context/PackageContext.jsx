import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";
import { getDestinations } from "../services/destination.services";
import { initialize } from "../services/initial.services";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = async () => {
        setLoading(true);
        const vId = localStorage.getItem("v_id");
        setError(null);
        try {
            if (!vId) {
                const init = await initialize(vId);
                const newVId = init.v_id;
                localStorage.setItem("v_id", newVId);
            }
            const packagesData = await getAllPackages();
            const destinationData = await getDestinations();
            setPackages(packagesData.packages);
            setDestinations(destinationData.destinations);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <PackageContext.Provider value={{ packages, destinations, setPackages, loading, error, retry: fetch }}>{children}</PackageContext.Provider>
    );
};

export const usePackages = () => useContext(PackageContext);
