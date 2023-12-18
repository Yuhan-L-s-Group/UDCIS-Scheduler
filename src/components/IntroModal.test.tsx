import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { IntroModal } from "./IntroModal";

describe("IntroModal Component", () => {
    const mockHandleClose = jest.fn();

    test("renders the modal when show is true", () => {
        const { getByText } = render(
            <IntroModal show={true} handleClose={mockHandleClose} />
        );
        expect(
            getByText("Welcome to the UD CIS Scheduler")
        ).toBeInTheDocument();
    });

    test("calls handleClose when the close button is clicked", () => {
        const { getByRole } = render(
            <IntroModal show={true} handleClose={mockHandleClose} />
        );
        fireEvent.click(getByRole("button", { name: /close/i }));
        expect(mockHandleClose).toHaveBeenCalled();
    });
});
