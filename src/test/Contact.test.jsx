import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "../pages/Contact";
import { PackageProvider } from "../context/PackageContext";

vi.mock("../services/initial.services", () => ({
    countPagevisit: vi.fn().mockResolvedValue({ success: true }),
    initialize: vi.fn().mockResolvedValue({ v_id: "test-visitor-id" }),
}));

vi.mock("../services/enquiry.services", () => ({
    sendEnquiry: vi.fn().mockResolvedValue({ success: true, message: "Enquiry submitted" }),
    initiateNotification: vi.fn().mockResolvedValue({ success: true }),
    countWhatsappClicks: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("../services/packages.services", () => ({
    getAllPackages: vi.fn().mockResolvedValue({ packages: [] }),
    getPackageById: vi.fn().mockResolvedValue({ package: {} }),
}));

vi.mock("../services/destination.services", () => ({
    getDestinations: vi.fn().mockResolvedValue({ destinations: [] }),
}));

describe("Contact Page Integration", () => {
    it("renders contact desk details and enquiry form", () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Contact />
                </MemoryRouter>
            </PackageProvider>
        );

        expect(screen.getByRole("heading", { name: /Get in Touch|Start the Conversation/i })).toBeInTheDocument();
        expect(screen.getByText(/\+91 91422 34213/i)).toBeInTheDocument();
        expect(screen.getByText(/primetraveler2773@gmail\.com/i)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Send a Tour Enquiry|Send Custom Tour Enquiry/i })).toBeInTheDocument();
    });

    it("displays error message if required fields are empty on submission", async () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Contact />
                </MemoryRouter>
            </PackageProvider>
        );

        const submitBtn = screen.getByRole("button", { name: /Submit Enquiry|Submit Travel Enquiry/i });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/Please enter your name/i)).toBeInTheDocument();
    });

    it("submits enquiry when all required fields are filled", async () => {
        render(
            <PackageProvider>
                <MemoryRouter>
                    <Contact />
                </MemoryRouter>
            </PackageProvider>
        );

        const nameInput = screen.getByPlaceholderText(/Your name|Enter your full name/i);
        const phoneInput = screen.getByPlaceholderText(/Phone number|Enter phone number/i);

        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(phoneInput, { target: { value: "9876543210" } });

        // Select package via custom dropdown
        const pkgTrigger = screen.getByLabelText(/Select Package/i);
        fireEvent.click(pkgTrigger);
        const pkgOption = screen.getByRole("button", { name: /Other \/ Custom Himalayan Tour/i });
        fireEvent.click(pkgOption);

        // Select date via custom datepicker
        const dateTrigger = screen.getByLabelText(/Arrival Date/i);
        fireEvent.click(dateTrigger);
        const dayButtons = screen.getAllByRole("button", { name: /^[0-9]+$/ });
        const enabledDay = dayButtons.find((btn) => !btn.disabled);
        fireEvent.click(enabledDay);

        const submitBtn = screen.getByRole("button", { name: /Submit Enquiry|Submit Travel Enquiry/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByRole("heading", { name: /Enquiry Received!/i })).toBeInTheDocument();
        });
    });
});
