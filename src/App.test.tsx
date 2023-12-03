import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7b90dd3 (added older tests)
/* Format for tests cases
test("Replace with test details", () => {
    expect(screen.getByText(/Best/i)).toBeInTheDocument();
    const closeHomePage = screen.getByText("CLICK");
    userEvent.click(closeHomePage);
});
*/

describe("Scheduler Tests", () => {
<<<<<<< HEAD
=======
describe("App Tests", () => {
>>>>>>> 2da16ca (6 extra test cases)
=======
>>>>>>> 7b90dd3 (added older tests)
    beforeEach(() => {
        render(<App />);
    });

    test("Check home page and welcome window", () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7b90dd3 (added older tests)
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

<<<<<<< HEAD
<<<<<<< HEAD
        userEvent.type(Code, "FREN105");
        userEvent.type(Name, "French I - Elementary");
=======
        userEvent.type(Code, "JAPN105");
        userEvent.type(Name, "Japanese I - Elementary");
>>>>>>> 7b90dd3 (added older tests)
=======
        userEvent.type(Code, "FREN105");
        userEvent.type(Name, "French I - Elementary");
>>>>>>> f90e52d (japn to fren)
        userEvent.type(Credits, "4");
        const saveNewCourse = screen.getByText(/Save Changes/i);
        userEvent.click(saveNewCourse);

<<<<<<< HEAD
<<<<<<< HEAD
        expect(screen.getByText(/FREN105/i)).toBeInTheDocument();
        expect(
            screen.getByText(/French I - Elementary/i)
=======
        expect(screen.getByText(/JAPN105/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Japanese I - Elementary/i)
>>>>>>> 7b90dd3 (added older tests)
=======
        expect(screen.getByText(/FREN105/i)).toBeInTheDocument();
        expect(
            screen.getByText(/French I - Elementary/i)
>>>>>>> f90e52d (japn to fren)
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

<<<<<<< HEAD
<<<<<<< HEAD
        //search CISC210
        const searchBox = screen.getAllByRole("textbox")[1];
        const seachButton = screen.getByText("Search");
        userEvent.type(searchBox, "CISC210");
        userEvent.click(seachButton);
        expect(screen.getByText("Course Code: CISC210")).toBeInTheDocument();
=======
        //search CISC108
=======
        //search CISC210
>>>>>>> 0054a64 (incorrect course code)
        const searchBox = screen.getAllByRole("textbox")[1];
        const seachButton = screen.getByText("Search");
        userEvent.type(searchBox, "CISC210");
        userEvent.click(seachButton);
<<<<<<< HEAD
        expect(screen.getByText("Course Code: CISC108")).toBeInTheDocument();
>>>>>>> 7b90dd3 (added older tests)
=======
        expect(screen.getByText("Course Code: CISC210")).toBeInTheDocument();
>>>>>>> 0054a64 (incorrect course code)

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
            screen.getByText("Please make sure the course code is correct!")
        ).toBeInTheDocument();

        //input in lower case
        userEvent.clear(searchBox);
<<<<<<< HEAD
<<<<<<< HEAD
        userEvent.type(searchBox, "cisc210");
=======
        userEvent.type(searchBox, "cisc108");
>>>>>>> 7b90dd3 (added older tests)
=======
        userEvent.type(searchBox, "cisc210");
>>>>>>> 0054a64 (incorrect course code)
        userEvent.click(seachButton);
        expect(
            screen.queryByText("Please make sure course code is correct!")
        ).not.toBeInTheDocument();
<<<<<<< HEAD
<<<<<<< HEAD
        expect(screen.getByText("Course Code: CISC210")).toBeInTheDocument();
=======
        expect(screen.getByText("Course Code: CISC108")).toBeInTheDocument();
>>>>>>> 7b90dd3 (added older tests)
=======
        expect(screen.getByText("Course Code: CISC210")).toBeInTheDocument();
>>>>>>> 0054a64 (incorrect course code)
    });
//clearing the semester selected
    test("Test clearing all semesters", () => {
    const closingHomePage = screen.getByText("CLICK");
    userEvent.click(closingHomePage);

    const clearAll = screen.getByText("Clear All");
    userEvent.click(clearAll);

    expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
    expect(screen.queryByText(/Semster:/i)).not.toBeInTheDocument();
    });

    test("Test adding courses to a semester", () => {
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);
    
        const addSemesterButton = screen.getByText("Add A New Semester");
        userEvent.click(addSemesterButton);
    
        const saveButton = screen.getByText("Save");
        userEvent.click(saveButton);
    
        expect(screen.getByText(/Semster: Fall 2023/i)).toBeInTheDocument();
    
        const addToSemesterButton = screen.getAllByText("Add to Semester")[0];
        userEvent.click(addToSemesterButton);
    
        const saveChangesButton = screen.getByText("Save Changes");
        userEvent.click(saveChangesButton);
    
        expect(screen.getByText(/Total: 0/i)).toBeInTheDocument();
    });

    test("Test switching degree plans", () => {
    const closeHomePage = screen.getByText("CLICK");
    userEvent.click(closeHomePage);

    const degreePlanButton = screen.getByText("Add New Degree Plan");
    userEvent.click(degreePlanButton);

    const saveDegreePlanButton = screen.getByText("Save");
    userEvent.click(saveDegreePlanButton);

    const editDegreeButton = screen.getByText("Edit");
    userEvent.click(editDegreeButton);

    expect(screen.getByText(/Degree List/i)).toBeInTheDocument();
    });

    test("Test error handling for incorect course code entered", () => {
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);

        const searchBox = screen.getAllByRole("textbox")[1];
        userEvent.type(searchBox, "The code entered is incorrect.");
<<<<<<< HEAD
<<<<<<< HEAD
        userEvent.type(searchBox, "CIST107");
=======
=======
        userEvent.type(searchBox, "CIST107");
>>>>>>> 15691f2 (clearing search results)

        const searchButton = screen.getByText("Search");
        userEvent.click(searchButton);

        expect(
        screen.getByText("Please ensure course code entered is correct!")
        ).toBeInTheDocument();
    });
<<<<<<< HEAD
>>>>>>> 0054a64 (incorrect course code)

        const searchButton = screen.getByText("Search");
        userEvent.click(searchButton);

        expect(
        screen.getByText("Please ensure course code entered is correct!")
        ).toBeInTheDocument();
    });
=======
>>>>>>> 8d36671 (delete degree plan)
    //clearing something that was found in the results
    test("Test clearing search results", () => {
        const closeHomePage = screen.getByText("CLICK");
        userEvent.click(closeHomePage);
    
        const switchToSearchButton = screen.getByText("Switch");
        userEvent.click(switchToSearchButton);
    
        const searchBox = screen.getAllByRole("textbox")[1];
        userEvent.type(searchBox, "CISC108");
    
        const searchButton = screen.getByText("Search");
        userEvent.click(searchButton);
    
        const clearSearchButton = screen.getByText("Clear Search");
        userEvent.click(clearSearchButton);
    
        expect(screen.queryByText("Course Code: CISC108")).not.toBeInTheDocument();
<<<<<<< HEAD
    });
//deletes the degree plan
    test("Test degree plan delete", () => {
        const closeHomePage = screen.getByText("CLICK");
    userEvent.click(closeHomePage);

    const deleteDegreeButton = screen.getByText("Delete");
    userEvent.click(deleteDegreeButton);

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
=======
>>>>>>> 15691f2 (clearing search results)
    });
//deletes the degree plan
    test("Test degree plan delete", () => {
        const closeHomePage = screen.getByText("CLICK");
    userEvent.click(closeHomePage);

    const deleteDegreeButton = screen.getByText("Delete");
    userEvent.click(deleteDegreeButton);

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });
});
