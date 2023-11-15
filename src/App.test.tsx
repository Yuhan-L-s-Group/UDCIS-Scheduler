import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    test("renders App component correctly", () => {
        render(<App />);

        // Check if the header is rendered
        expect(screen.getByText(/Yuhan L‘s Group/i)).toBeInTheDocument();

        // Check if the group members are rendered
        expect(
            screen.getByText(
                /Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi Zhou, Henry Grant, Thern Diallo/i
            )
        ).toBeInTheDocument();

        // Check if the SwitchPlan component is rendered
        expect(screen.getByText(/SwitchPlan/i)).toBeInTheDocument();

        // Check if the "Add New Semester" button is rendered
        expect(screen.getByText(/Add New Semester/i)).toBeInTheDocument();

        // Check if the SemesterList component is rendered
        expect(screen.getByTestId("semester-list")).toBeInTheDocument();

        // Check if the "Clear All" button is rendered
        expect(screen.getByText(/Clear All/i)).toBeInTheDocument();

        // Check if the AddSemesterModal component is initially hidden
        expect(
            screen.queryByTestId("add-semester-modal")
        ).not.toBeInTheDocument();
    });

    test("opens and closes AddSemesterModal on button click", () => {
        render(<App />);

        // Click on the "Add New Semester" button
        const addButton = screen.getByText(/Add New Semester/i);
        fireEvent.click(addButton);

        // Check if the AddSemesterModal is rendered after clicking the button
        expect(screen.getByTestId("add-semester-modal")).toBeInTheDocument();

        // Click on the close button inside the AddSemesterModal
        const closeModalButton = screen.getByText(/Close/i);
        fireEvent.click(closeModalButton);

        // Check if the AddSemesterModal is closed after clicking the close button
        expect(
            screen.queryByTestId("add-semester-modal")
        ).not.toBeInTheDocument();
    });

    // Add more tests as needed for other functionalities and components
});
