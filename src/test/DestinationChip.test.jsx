import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DestinationChip from "../components/DestinationChip";

const mockDest = {
    id: "north-sikkim",
    name: "North Sikkim",
    tagline: "Glacial lakes & high snow peaks",
    coord: "27.7025° N, 88.7431° E",
    img: "https://example.com/sikkim.jpg",
    toursCount: 5,
};

describe("DestinationChip Component", () => {
    it("renders destination details and coordinate badge", () => {
        render(
            <MemoryRouter>
                <DestinationChip dest={mockDest} />
            </MemoryRouter>
        );

        expect(screen.getByText("North Sikkim")).toBeInTheDocument();
        expect(screen.getByText("27.7025° N, 88.7431° E")).toBeInTheDocument();
        expect(screen.getByText(/5\+ Tours/i)).toBeInTheDocument();
        expect(screen.getByText("Glacial lakes & high snow peaks")).toBeInTheDocument();
    });

    it("links to packages page with destination filter parameter", () => {
        render(
            <MemoryRouter>
                <DestinationChip dest={mockDest} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/packages?dest=North%20Sikkim");
    });
});
