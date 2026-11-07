import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Timeline from "../components/Itinerary";

const mockItinerary = [
    {
        dayNumber: 1,
        title: "Arrival in Darjeeling",
        description: "Scenic drive from Bagdogra through tea estates.",
        mealsIncluded: { breakfast: false, lunch: false, dinner: true },
        activities: [
            { name: "Chowrasta Mall Evening Walk", isExtraCharge: false },
            { name: "Heritage Toy Train Joy Ride", isExtraCharge: true, extraChargeAmount: 500 },
        ],
    },
    {
        dayNumber: 2,
        title: "Tiger Hill Sunrise",
        description: "Dawn view of Mount Kanchenjunga.",
        mealsIncluded: { breakfast: true, lunch: true, dinner: true },
        activities: [
            { name: "Batasia Loop War Memorial", isExtraCharge: false },
        ],
    },
];

describe("Timeline (Itinerary) Component", () => {
    it("renders itinerary days with step numbers and descriptions", () => {
        render(<Timeline itinerary={mockItinerary} />);

        expect(screen.getByText("Arrival in Darjeeling")).toBeInTheDocument();
        expect(screen.getByText("Tiger Hill Sunrise")).toBeInTheDocument();
        expect(screen.getByText(/Scenic drive from Bagdogra/i)).toBeInTheDocument();
        expect(screen.getByText(/2 Days Planned/i)).toBeInTheDocument();
    });

    it("renders activities and highlights extra charges", () => {
        render(<Timeline itinerary={mockItinerary} />);

        expect(screen.getByText(/Chowrasta Mall Evening Walk/i)).toBeInTheDocument();
        expect(screen.getByText(/Heritage Toy Train Joy Ride/i)).toBeInTheDocument();
        expect(screen.getByText(/\(\+₹500\)/i)).toBeInTheDocument();
    });

    it("renders meals badges", () => {
        render(<Timeline itinerary={mockItinerary} />);

        const breakfastLabels = screen.getAllByText(/Breakfast/i);
        expect(breakfastLabels.length).toBeGreaterThan(0);
        const dinnerLabels = screen.getAllByText(/Dinner/i);
        expect(dinnerLabels.length).toBeGreaterThan(0);
    });

    it("renders fallback message when itinerary is empty", () => {
        render(<Timeline itinerary={[]} />);

        expect(screen.getByText(/Detailed day-by-day itinerary will be customized/i)).toBeInTheDocument();
    });
});
