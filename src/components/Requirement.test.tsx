import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Requirement, getURLs } from "./Requirement";
import { DegreePlan } from "../interfaces/degreePlan";

describe("Requirement Component", () => {
    const mockDegreePlan: DegreePlan = {
        name: "",
        concentration: "Bachelor of Arts",
        semesters: []
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const mockHandleClose = () => {};

    test("does not render Requirement component when show is false", () => {
        const { queryByText } = render(
            <Requirement
                degreePlan={mockDegreePlan}
                show={false}
                handleClose={mockHandleClose}
            />
        );
        expect(queryByText("Degree Plan Requirement")).not.toBeInTheDocument();
    });

    test("getURLs function returns correct URL for a given concentration", () => {
        const url = getURLs("Bachelor of Arts");
        expect(url).toBe(
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34726"
        );
    });
});
