import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("check the test file works or not", () => {
    render(<App />);
    const linkElement = screen.getByText(/Welcome/i);
    expect(linkElement).toBeInTheDocument();
});
