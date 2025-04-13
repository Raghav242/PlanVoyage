import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

// 👤 Mock the AuthContext
vi.mock("../context/AuthContext", () => ({
  useAuthUser: vi.fn(),
}));

import { useAuthUser } from "../context/AuthContext";

describe("Navbar Component", () => {
  it("shows Login/Register when no user is logged in", () => {
    useAuthUser.mockReturnValue({ user: null });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("PlanVoyage")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Plan Your Trips")).toBeInTheDocument();
    expect(screen.getByText("Saved Plans")).toBeInTheDocument();
    expect(screen.getByText("Trip Suggestions")).toBeInTheDocument();
    expect(screen.getByText("Login/Register")).toBeInTheDocument();
  });

  it("shows the username and logout button when user is logged in", () => {
    useAuthUser.mockReturnValue({
      user: { id: 1, username: "raghav" },
      logout: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("raghav")).toBeInTheDocument();
  });
});
