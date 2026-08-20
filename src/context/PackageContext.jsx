import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPackages = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAllPackages();
            setPackages(data.packages);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return <PackageContext.Provider value={{ packages, loading, error, retry: fetchPackages }}>{children}</PackageContext.Provider>;
};

export const usePackages = () => useContext(PackageContext);
