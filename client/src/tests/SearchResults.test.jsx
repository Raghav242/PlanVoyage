// src/tests/SearchResults.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import SearchResults from "../pages/SearchResults";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");
vi.mock("../context/AuthContext", () => ({
  useAuthUser: () => ({ user: { id: 1 } }),
}));

describe("SearchResults Component", () => {
  it("renders Search Results and loading state", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] }) // Mock /api/places response
      .mockResolvedValueOnce({ data: [] }); // Mock /api/plans/user/1 response

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    expect(screen.getByText(/Search Results for/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/No places found/i)).toBeInTheDocument()
    );
  });
});
