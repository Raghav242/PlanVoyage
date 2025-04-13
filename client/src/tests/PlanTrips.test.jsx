import { render, screen, fireEvent } from "@testing-library/react";
import PlanTrips from "../pages/planTrips";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("PlanTrips Component", () => {
  let alertMock;
  let localStorageMock;

  beforeEach(() => {
    // Mock window.alert
    alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    
    // Mock localStorage
    localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form inputs and submits with valid values", () => {
    const { container } = render(
      <MemoryRouter>
        <PlanTrips />
      </MemoryRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Where are you going/i), {
      target: { value: "Boston" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Distance/i), {
      target: { value: "10" },
    });

    // Select category - using the select element directly
    const selectElement = container.querySelector("select");
    fireEvent.change(selectElement, {
      target: { value: "tourism.attraction" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Search/i));

    // Verify localStorage was updated correctly
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "tripSearch",
      JSON.stringify({
        destination: "Boston",
        distance: "10",
        category: "tourism.attraction",
      })
    );
  });

  it("shows alert when required fields are missing", () => {
    render(
      <MemoryRouter>
        <PlanTrips />
      </MemoryRouter>
    );

    // Try to submit with empty form
    const submitButton = screen.getByText(/Search/i);
    fireEvent.click(submitButton);

    // Verify alert was called with correct message
    expect(alertMock).toHaveBeenCalledWith("Please fill all required fields!");
  });
});