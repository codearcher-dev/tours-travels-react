import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Packages from "../pages/Packages";
import { PackageProvider } from "../context/PackageContext";

const { testPackages } = await vi.hoisted(async () => {
    const mod = await import("../data/packages");
    return { testPackages: mod.default || mod.samplePackages };
});

vi.mock("../services/initial.services", () => ({
    countPagevisit: vi.fn().mockResolvedValue({ success: true }),
    initialize: vi.fn().mockResolvedValue({ v_id: "test-visitor-id" }),
}));

vi.mock("../services/packages.services", () => ({
    getAllPackages: vi.fn().mockResolvedValue({ packages: testPackages }),
    getPackageById: vi.fn().mockResolvedValue({ package: {} }),
}));

vi.mock("../services/destination.services", () => ({
    getDestinations: vi.fn().mockResolvedValue({ destinations: [] }),
}));

describe("Packages Page Integration", () => {
    it("renders page title and search bar", async () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Packages />
                </MemoryRouter>
            </PackageProvider>
        );

        expect(screen.getByRole("heading", { name: /Curated Tour Packages/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search by destination, hill, monastery or keyword/i)).toBeInTheDocument();
    });

    it("filters packages by search keyword", async () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Packages />
                </MemoryRouter>
            </PackageProvider>
        );

        // Wait for packages to load
        expect(await screen.findByText(/Darjeeling Queen of Hills Experience/i)).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText(/Search by destination/i);
        fireEvent.change(searchInput, { target: { value: "Darjeeling" } });

        // Darjeeling package should still be present
        expect(screen.getByText(/Darjeeling Queen of Hills Experience/i)).toBeInTheDocument();

        // Search for non-existing keyword
        fireEvent.change(searchInput, { target: { value: "NonExistentLocationXYZ" } });
        expect(await screen.findByText(/No Journeys Match Your Search/i)).toBeInTheDocument();
    });

    it("resets filters when clicking reset button", async () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Packages />
                </MemoryRouter>
            </PackageProvider>
        );

        // Wait for packages to load
        expect(await screen.findByText(/Darjeeling Queen of Hills Experience/i)).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText(/Search by destination/i);
        fireEvent.change(searchInput, { target: { value: "NonExistentLocationXYZ" } });

        const resetBtn = await screen.findByRole("button", { name: /Reset All Filters/i });
        fireEvent.click(resetBtn);

        expect(searchInput.value).toBe("");
        expect(await screen.findByText(/Darjeeling Queen of Hills Experience/i)).toBeInTheDocument();
    });
});
