import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { PackageProvider } from "../context/PackageContext";

// Mock services to prevent network calls
vi.mock("../services/feedback.services", () => ({
    getFeedbacks: vi.fn().mockResolvedValue({
        feedbacks: [
            { name: "Pooja B", package: "Sikkim Explorer", review: "Loved every minute!" },
        ],
    }),
}));

vi.mock("../services/initial.services", () => ({
    countPagevisit: vi.fn().mockResolvedValue({ success: true }),
    initialize: vi.fn().mockResolvedValue({ v_id: "test-visitor-id" }),
}));

vi.mock("../services/packages.services", () => ({
    getAllPackages: vi.fn().mockResolvedValue({ packages: [] }),
    getPackageById: vi.fn().mockResolvedValue({ package: {} }),
}));

vi.mock("../services/destination.services", () => ({
    getDestinations: vi.fn().mockResolvedValue({ destinations: [] }),
}));

describe("Home Page Integration", () => {
    it("renders hero section and headline", async () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </PackageProvider>
        );

        expect(screen.getByText(/Unveil the Majesty of/i)).toBeInTheDocument();
        expect(screen.getByText(/Sikkim & West Bengal Govt\. Authorized Tour Operator/i)).toBeInTheDocument();
    });

    it("renders quick search bar with destination select and search button", () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </PackageProvider>
        );

        expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Travel Style/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Explore Tours/i })).toBeInTheDocument();
    });

    it("renders core sections: Trending Destinations, Signature Tour Packages, Process", () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </PackageProvider>
        );

        expect(screen.getByText(/Trending Destinations/i)).toBeInTheDocument();
        expect(screen.getByText(/Signature Tour Packages/i)).toBeInTheDocument();
        expect(screen.getByText(/How We Plan Your Tour/i)).toBeInTheDocument();
    });
});
