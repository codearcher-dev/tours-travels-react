import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WhatsAppSticky from "../components/WhatsAppSticky";

describe("WhatsAppSticky Component", () => {
    it("renders floating WhatsApp button with correct phone link", () => {
        render(<WhatsAppSticky />);

        const link = screen.getByRole("link", { name: /Chat directly on WhatsApp/i });
        expect(link).toBeInTheDocument();
        expect(link.getAttribute("href")).toContain("wa.me/919142234213");
        expect(link).toHaveAttribute("target", "_blank");
    });
});
