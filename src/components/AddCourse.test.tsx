import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCourse } from "./AddCourse";

describe("AddCourse Component Tests", () => {
    test("To save changes when a new course is added", () => {
        const onMock = jest.fn();
        const setListCoursesMock = jest.fn();
        render(
            <AddCourse
                onClose={onMock}
                listCourses={[]}
                setListCourses={setListCoursesMock}
            />
        );

        const cdIN = screen.getByLabelText("Code");
        const nameIn = screen.getByLabelText("Name");
        const descriptionInput = screen.getByLabelText("Description");
        const creditsIn = screen.getByLabelText("Credits");
        const saveIT = screen.getByText("Save Changes");

        userEvent.type(cdIN, "CISC300-1");
        userEvent.type(nameIn, "300-Level Technology Elective I");
        userEvent.type(
            descriptionInput,
            "Computer science technical electives numbered 301 or above, except for CISC 355, CISC 356, CISC 357, CISC 366, CISC 465, and CISC 466. Because of their very nature, Experimental Courses (courses with an x67 number) must be approved beforehand by the CIS Undergraduate Committee before being accepted toward the technical elective requirement."
        );
        userEvent.type(creditsIn, "3");

        userEvent.click(saveIT);

        expect(onMock).toHaveBeenCalled();

        expect(setListCoursesMock).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    code: "CISC300-1",
                    name: "300-Level Technology Elective I",
                    description:
                        "Computer science technical electives numbered 301 or above, except for CISC 355, CISC 356, CISC 357, CISC 366, CISC 465, and CISC 466. Because of their very nature, Experimental Courses (courses with an x67 number) must be approved beforehand by the CIS Undergraduate Committee before being accepted toward the technical elective requirement.",
                    credits: 3
                })
            ])
        );
    });
});

test("Form fields when they are empty", () => {
    render(
        <AddCourse
            onClose={() => {}}
            listCourses={[]}
            setListCourses={() => {}}
        />
    );

    const codeIn = screen.getByLabelText("Code");
    const nameIn = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const creditsIn = screen.getByLabelText("Credits");

    expect(codeIn).toHaveValue("");
    expect(nameIn).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(creditsIn).toHaveValue("");
});

test("Entering data and adding the new course", () => {
    const onMock = jest.fn();
    const setListCoursesMock = jest.fn();

    render(
        <AddCourse
            onClose={onMock}
            listCourses={[]}
            setListCourses={setListCoursesMock}
        />
    );

    const codeIn = screen.getByLabelText("Code");
    const nameIn = screen.getByLabelText("Name");
    const descriptionIn = screen.getByLabelText("Description");
    const creditsIn = screen.getByLabelText("Credits");
    const saveIT = screen.getByText("Save Changes");

    userEvent.type(codeIn, "CISC260");
    userEvent.type(nameIn, "Machine Organization and Assembly Language");
    userEvent.type(
        descriptionIn,
        "Introduction to the basics of machine organization. Programming tools and techniques at the machine and assembly levels. Assembly language programming and computer arithmetic techniques."
    );
    userEvent.type(creditsIn, "3");
    userEvent.click(saveIT);
});

test("Entering data that is not valid and it shows errors", () => {
    render(
        <AddCourse
            onClose={() => {}}
            listCourses={[]}
            setListCourses={() => {}}
        />
    );

    const codeIn = screen.getByLabelText("Code");
    const nameIn = screen.getByLabelText("Name");
    const creditsIn = screen.getByLabelText("Credits");
    const saveIT = screen.getByText("Save Changes");

    userEvent.type(codeIn, "CISC108");
    userEvent.type(nameIn, "Introduction to Computer Science");
    userEvent.type(creditsIn, "");
    userEvent.click(saveIT);

    const errorMessages = screen.getAllByText("Field cannot be empty");
    expect(errorMessages).toHaveLength(1);
});

test("User can cancel adding a course and modal is closed", () => {
    const onMock = jest.fn();
    render(
        <AddCourse
            onClose={onMock}
            listCourses={[]}
            setListCourses={() => {}}
        />
    );
    const cancel = screen.getByText("Cancel");
    userEvent.click(cancel);

    expect(onMock).toHaveBeenCalled();
});

test("User can add a course with pre-requisites and corequisites", () => {
    const onMock = jest.fn();
    const setListCoursesMock = jest.fn();

    render(
        <AddCourse
            onClose={onMock}
            listCourses={[]}
            setListCourses={setListCoursesMock}
        />
    );

    const codeIn = screen.getByLabelText("Code");
    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const creditsInput = screen.getByLabelText("Credits");
    const preReqInput = screen.getByLabelText("Pre-Requisites");
    const coreReqInput = screen.getByLabelText("Corequisites");
    const saveButton = screen.getByText("Save Changes");

    userEvent.type(codeIn, "CISC181");
    userEvent.type(nameInput, "Introduction to Computer Science II");
    userEvent.type(
        descriptionInput,
        "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation."
    );
    userEvent.type(creditsInput, "3");
    userEvent.type(preReqInput, "CISC106, CISC108");
    userEvent.type(coreReqInput, "MATH241 | MATH221");

    userEvent.click(saveButton);

    expect(onMock).toHaveBeenCalled();

    expect(setListCoursesMock).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
                code: "CISC181",
                name: "Introduction to Computer Science II",
                description:
                    "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation.",
                credits: 3,
                preReq: ["CISC106, CISC108"],
                coreReq: ["MATH241 | MATH221"]
            })
        ])
    );

    test("To edit existing course", () => {
        const existingCourses = [
            {
                code: "CISC108",
                name: "Introduction to Computer Science",
                description:
                    "Computing and principles of programming with an emphasis on systematic program design. Topics include functional programming, data abstraction, procedural abstraction, use of control and state, recursion, testing, and object-oriented programming concepts. Requires no prior programming experience, open to any major, but intended primarily for majors and minors in computer science or mathematics.",
                credits: 3,
                preReq: [],
                coreReq: []
            }
        ];

        const onCloseMock = jest.fn(); // Mock the onClose function
        const setListCoursesMock = jest.fn(); // Mock the setListCourses function

        render(
            <AddCourse
                onClose={onCloseMock}
                listCourses={existingCourses}
                setListCourses={setListCoursesMock}
            />
        );

        const codeIn = screen.getByLabelText("Code");
        const nameIn = screen.getByLabelText("Name");
        const descriptionIn = screen.getByLabelText("Description");
        const creditsIn = screen.getByLabelText("Credits");
        const saveIT = screen.getByText("Save Changes");

        expect(codeIn).toHaveValue("CISC108");
        expect(nameIn).toHaveValue("Introduction to Computer Science");
        expect(descriptionIn).toHaveValue(
            "Computing and principles of programming with an emphasis on systematic program design. Topics include functional programming, data abstraction, procedural abstraction, use of control and state, recursion, testing, and object-oriented programming concepts. Requires no prior programming experience, open to any major, but intended primarily for majors and minors in computer science or mathematics."
        );
        expect(creditsIn).toHaveValue("3");

        userEvent.clear(codeIn);
        userEvent.type(codeIn, "CISC210");

        userEvent.clear(nameIn);
        userEvent.type(nameIn, "Introduction to Systems Programming");

        userEvent.clear(descriptionIn);
        userEvent.type(
            descriptionIn,
            "Principles of computer systems programming for software and hardware platforms to achieve efficient resource usage. Topics include the C programming language, memory management, and awareness of system constraints and interfacing. Projects include programming embedded systems and interactive objects."
        );

        userEvent.clear(creditsIn);
        userEvent.type(creditsIn, "3");

        userEvent.click(saveIT);

        expect(onCloseMock).toHaveBeenCalled();

        expect(setListCoursesMock).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    code: "CISC210",
                    name: "Introduction to Systems Programming",
                    description:
                        "Principles of computer systems programming for software and hardware platforms to achieve efficient resource usage. Topics include the C programming language, memory management, and awareness of system constraints and interfacing. Projects include programming embedded systems and interactive objects.",
                    credits: 3,
                    preReq: ["CISC106 | CISC108"],
                    coreReq: ["MATH221 | MATH241"]
                })
            ])
        );
    });
});
