import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar Component", () => {
    beforeEach(() => {
        document.body.style.overflow = "";
    });

    it("renders brand logo and title", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText(/Prime/i)).toBeInTheDocument();
        expect(screen.getByText(/Traveller/i)).toBeInTheDocument();
    });

    it("renders desktop navigation links", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /^Home$/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /^Tours & Packages$/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /^About Us$/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /^Contact & Enquiry$/i })).toBeInTheDocument();
    });

    it("renders Call and Enquire action buttons", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const callBtn = screen.getByLabelText(/Call Travel Desk/i);
        expect(callBtn).toBeInTheDocument();
        expect(callBtn).toHaveAttribute("href", "tel:+919142234213");

        const enquireLinks = screen.getAllByRole("link", { name: /Enquire/i });
        expect(enquireLinks.length).toBeGreaterThan(0);
    });

    it("toggles mobile menu when hamburger button is clicked", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const hamburgerBtn = screen.getByLabelText(/Open Navigation Menu/i);
        expect(hamburgerBtn).toBeInTheDocument();

        // Click to open
        fireEvent.click(hamburgerBtn);

        // Body overflow should be locked to prevent scroll
        expect(document.body.style.overflow).toBe("hidden");

        // Menu should display close button
        const closeBtn = screen.getByLabelText(/Close Navigation Menu/i);
        expect(closeBtn).toBeInTheDocument();

        // Click to close
        fireEvent.click(closeBtn);
        expect(document.body.style.overflow).toBe("");
    });
});
