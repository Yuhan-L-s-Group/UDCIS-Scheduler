import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

/* Format for tests cases
test("Replace with test details", () => {
    expect(screen.getByText(/Best/i)).toBeInTheDocument();
    const closeHomePage = screen.getByText("CLICK");
    userEvent.click(closeHomePage);
});
*/

describe("Scheduler Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Check home page and welcome window", () => {
        expect(screen.getByText(/Best/i)).toBeInTheDocument();
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);

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
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);
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

    test("Try to add and delete semester", async () => {
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);

        //check if modal works
        const AddSemester = screen.getByText("Add New Semester");
        userEvent.click(AddSemester);
        screen.getByText(/Season:/i);
        screen.getByText(/Year:/i);

        //add a new semester into list
        const submit = screen.getByText("Save");
        userEvent.click(submit);
        expect(screen.getByText(/Semster: Fall 2023/i)).toBeInTheDocument();

        //add course into semester
        const allElements = screen.getAllByText(/Add to semester/i);
        const firstElement = allElements[0];
        userEvent.click(firstElement);
        screen.getAllByText(/2023 Fall/i)[0];

        //check if add
        const save = screen.getAllByText("Save Changes")[0];
        userEvent.click(save);

        /* await waitFor(() => {
            expect(
                screen.getByText("CISC108 - Introduction to Computer Science I")
            );
        }); */

        //check credit
        expect(screen.getByText(/Total: 0/i)).toBeInTheDocument();

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

    test("Add a course that does not exist in the list", () => {
        expect(screen.getByText(/Best/i)).toBeInTheDocument();
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);

        const addNewCourse = screen.getByText(/Add Course/i);
        userEvent.click(addNewCourse);
        expect(screen.getByText(/Description/i)).toBeInTheDocument();

        const Code = screen.getAllByRole("textbox")[1];
        const Name = screen.getAllByRole("textbox")[2];
        const Credits = screen.getAllByRole("textbox")[4];

        userEvent.type(Code, "JAPN105");
        userEvent.type(Name, "Japanese I - Elementary");
        userEvent.type(Credits, "4");
        const saveNewCourse = screen.getByText(/Save Changes/i);
        userEvent.click(saveNewCourse);

        expect(screen.getByText(/JAPN105/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Japanese I - Elementary/i)
        ).toBeInTheDocument();
    });

    test("Replace with test details", () => {
        expect(screen.getByText(/Best/i)).toBeInTheDocument();
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);

        //try to edit CISC108
        const edit = screen.getAllByText(/Edit/i);
        const edit108 = edit[0];
        userEvent.click(edit108);

        //check modal
        expect(screen.getAllByText(/Edit Course/i)[0]).toBeInTheDocument();

        //change course
        /* const Code = screen.getAllByRole("textbox")[1];
        const Name = screen.getAllByRole("textbox")[2];
        const Credits = screen.getAllByRole("textbox")[4]; */
        /* userEvent.clear(Code);
        userEvent.clear(Name);
        userEvent.clear(Credits);
        userEvent.type(Code, "CISC106");
        userEvent.type(Name, "General Computer Science for Engineers");
        userEvent.type(Credits, "3");

        const save = screen.getByText(/Save Changes/i);
        userEvent.click(save);

        expect(screen.getByText(/CISC106/i)).toBeInTheDocument();
        expect(
            screen.getByText(/General Computer Science for Engineers/i)
        ).toBeInTheDocument(); */
    });

    test("Test search bar", () => {
        expect(screen.getByText(/Best/i)).toBeInTheDocument();
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);

        const switchToSeach = screen.getByText("Switch");
        userEvent.click(switchToSeach);

        //search CISC108
        const searchBox = screen.getAllByRole("textbox")[1];
        const seachButton = screen.getByText("Search");
        userEvent.type(searchBox, "CISC108");
        userEvent.click(seachButton);
        expect(screen.getByText("Course Code: CISC108")).toBeInTheDocument();

        //add course from search bar
        const addButton = screen.getByText("Add to Semester");
        userEvent.click(addButton);
        expect(screen.getByText("Choose One Semester")).toBeInTheDocument();
        const save = screen.getByText("Save Changes");
        userEvent.click(save);
        expect(
            screen.queryByText("Choose One Semester")
        ).not.toBeInTheDocument();

        //input something wrong
        userEvent.clear(searchBox);
        userEvent.type(searchBox, "CISC");
        userEvent.click(seachButton);
        expect(
            screen.getByText("Please make sure course code is correct!")
        ).toBeInTheDocument();

        //input in lower case
        userEvent.clear(searchBox);
        userEvent.type(searchBox, "cisc108");
        userEvent.click(seachButton);
        expect(
            screen.queryByText("Please make sure course code is correct!")
        ).not.toBeInTheDocument();
        expect(screen.getByText("Course Code: CISC108")).toBeInTheDocument();
    });
});
