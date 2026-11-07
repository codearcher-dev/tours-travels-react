import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PackageDetail from "../pages/PackageDetail";
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

describe("PackageDetail Page Integration", () => {
    it("renders package details for valid slug", async () => {
        render(
            <PackageProvider>
                <MemoryRouter initialEntries={["/package/darjeeling-delight"]}>
                    <Routes>
                        <Route path="/package/:slug" element={<PackageDetail />} />
                    </Routes>
                </MemoryRouter>
            </PackageProvider>
        );

        expect(await screen.findByRole("heading", { name: /Darjeeling Queen of Hills Experience/i })).toBeInTheDocument();
        expect(screen.getByText(/About this Journey/i)).toBeInTheDocument();
        expect(screen.getByText(/Inclusions & Exclusions/i)).toBeInTheDocument();
        expect(screen.getByText(/Detailed Itinerary/i)).toBeInTheDocument();
    });

    it("renders desktop and mobile enquiry booking buttons", async () => {
        render(
            <PackageProvider>
                <MemoryRouter initialEntries={["/package/darjeeling-delight"]}>
                    <Routes>
                        <Route path="/package/:slug" element={<PackageDetail />} />
                    </Routes>
                </MemoryRouter>
            </PackageProvider>
        );

        expect(await screen.findByRole("link", { name: /Send Tour Enquiry/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Quick WhatsApp Enquiry/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /^Enquire Now$/i })).toBeInTheDocument();
    });

    it("renders fallback when package is not found", async () => {
        render(
            <PackageProvider>
                <MemoryRouter initialEntries={["/package/unknown-package"]}>
                    <Routes>
                        <Route path="/package/:slug" element={<PackageDetail />} />
                    </Routes>
                </MemoryRouter>
            </PackageProvider>
        );

        expect(await screen.findByRole("heading", { name: /Journey Not Found/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Return to Packages/i })).toBeInTheDocument();
    });
});
