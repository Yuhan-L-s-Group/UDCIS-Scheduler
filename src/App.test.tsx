import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Scheduler Tests", () => {
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

    test("Switch between different concentration (at this point, just check texts)", async () => {
        //initial value is BA
        expect(
            screen.getByText(
                /The current degree you are working with is Bachelor of Arts./i
            )
        ).toBeInTheDocument();

        //change to something else, e.g. BS
        const selectCon = screen.getByRole("combobox");
        userEvent.selectOptions(selectCon, "Bachelor of Science (not ready)");
        await waitFor(() => {
            expect(
                screen.queryByText(
                    "The current degree you are working with is Bachelor of Science (not ready)."
                )
            ).toBeInTheDocument();
        });
    });

    test("Try to add semester", async () => {
        //check if modal works
        const AddSemester = screen.getByText("Add New Semester");
        userEvent.click(AddSemester);
        screen.getByText(/Season:/i);
        screen.getByText(/Year:/i);

        //add a new semester into list
        const submit = screen.getByText("Save");
        userEvent.click(submit);
        screen.getByText(/Semster: Fall 2023/i);

        //add course into semester
        const allElements = screen.getAllByText(/Add to semester/i);
        const firstElement = allElements[0];
        userEvent.click(firstElement);
        screen.getAllByText(/2023 Fall/i);

        //check if add
        const save = screen.getAllByText("Save Changes");
        userEvent.click(save[0]);

        /* await waitFor(() => {
            expect(
                screen.getByText("CISC108 - Introduction to Computer Science I")
            );
        }); */

        //delete
        const DeleteSemester = screen.getByText(/Delete Entire Semester/i);
        userEvent.click(DeleteSemester);

        await waitFor(() => {
            expect(
                screen.queryByText("Semster: Fall 2023")
            ).not.toBeInTheDocument();
        });

        //clear
        const ClearAllSemester = screen.getByText(/Clear All/i);
        userEvent.click(ClearAllSemester);

        await waitFor(() => {
            expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
        });
    });

    //test("Delete semester", () => {});
});
