import { createContext, useContext, useEffect, useState } from "react";
import { getAllPackages } from "../services/packages.services";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getAllPackages();
                console.log(data.packages);
                setPackages(data.packages);
            } catch (error) {
                setError(error.response.data.message || "Failed to fetch packages");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return <PackageContext.Provider value={{ packages, loading, error }}>{children}</PackageContext.Provider>;
};

export const usePackages = () => useContext(PackageContext);
