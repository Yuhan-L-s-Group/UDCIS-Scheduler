import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Check welcome window", () => {
        //Check if the window was created correctly
        expect(
            screen.getByText(/Welcome to the UD CIS Scheduler/i)
        ).toBeInTheDocument();

        // Find close button and click
        const closeButton = screen.getByText("OK!");
        userEvent.click(closeButton);

        // modal goes away!
        expect(
            screen.queryByText("Welcome to the UD CIS Scheduler!")
        ).not.toBeInTheDocument();
    });

    test("Switch between different concentration (at this point, just check texts)", () => {});
});
