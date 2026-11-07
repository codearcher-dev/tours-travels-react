import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PackageCard from "../components/PackageCard";

const mockPackage = {
    _id: "test-pkg-1",
    slug: "darjeeling-hills",
    name: "Darjeeling Queen of Hills",
    description: "Panoramic vistas of Mt. Kanchenjunga with heritage tea estates.",
    location: { name: "Darjeeling" },
    duration: { nights: 4, days: 5 },
    price: { actual: 15000, discounted: 10000 },
    destinations: ["Tiger Hill", "Batasia Loop", "Ghoom"],
    img: { url: "https://example.com/test.jpg" },
    type: "Couple",
};

describe("PackageCard Component", () => {
    it("renders package title, duration, and location", () => {
        render(
            <MemoryRouter>
                <PackageCard pkg={mockPackage} />
            </MemoryRouter>
        );

        expect(screen.getByText("Darjeeling Queen of Hills")).toBeInTheDocument();
        expect(screen.getByText("4N / 5D")).toBeInTheDocument();
        expect(screen.getByText("Darjeeling")).toBeInTheDocument();
        expect(screen.getByText(/Panoramic vistas of Mt. Kanchenjunga/i)).toBeInTheDocument();
    });

    it("displays discounted price and calculates savings percentage", () => {
        render(
            <MemoryRouter>
                <PackageCard pkg={mockPackage} />
            </MemoryRouter>
        );

        expect(screen.getByText("₹10,000")).toBeInTheDocument();
        expect(screen.getByText("₹15,000")).toBeInTheDocument();
        // 10000 from 15000 is 33% savings
        expect(screen.getByText("Save 33%")).toBeInTheDocument();
    });

    it("renders link pointing to package details slug", () => {
        render(
            <MemoryRouter>
                <PackageCard pkg={mockPackage} />
            </MemoryRouter>
        );

        const exploreLink = screen.getByRole("link", { name: /View details for Darjeeling Queen of Hills/i });
        expect(exploreLink).toHaveAttribute("href", "/package/darjeeling-hills");
    });

    it("renders destination highlights tags", () => {
        render(
            <MemoryRouter>
                <PackageCard pkg={mockPackage} />
            </MemoryRouter>
        );

        expect(screen.getByText("Tiger Hill")).toBeInTheDocument();
        expect(screen.getByText("Batasia Loop")).toBeInTheDocument();
        expect(screen.getByText("Ghoom")).toBeInTheDocument();
    });
});
