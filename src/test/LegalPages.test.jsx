import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";

vi.mock("../services/initial.services", () => ({
    countPagevisit: vi.fn().mockResolvedValue({ success: true }),
    initialize: vi.fn().mockResolvedValue({ v_id: "test-visitor-id" }),
}));

describe("Privacy Policy Page", () => {
    it("renders policy title, DPDP compliance statement and contact details", () => {
        render(
            <MemoryRouter>
                <PrivacyPolicy />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: /^Privacy Policy$/i, level: 1 })).toBeInTheDocument();
        expect(screen.getAllByText(/Digital Personal Data Protection/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/primetraveler2773@gmail\.com/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/\+91 91422 34213/i)).toBeInTheDocument();
    });
});

describe("Terms & Conditions Page", () => {
    it("renders terms title, cancellation policy and contact details", () => {
        render(
            <MemoryRouter>
                <TermsConditions />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: /^Terms & Conditions$/i, level: 1 })).toBeInTheDocument();
        expect(screen.getByText(/Payment & Cancellation Policy/i)).toBeInTheDocument();
        expect(screen.getByText(/discretion and decision of the owner/i)).toBeInTheDocument();
        expect(screen.getAllByText(/primetraveler2773@gmail\.com/i).length).toBeGreaterThan(0);
    });
});
