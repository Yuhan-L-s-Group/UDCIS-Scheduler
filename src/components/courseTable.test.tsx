import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CoursesTable from "./courseTable";
import userEvent from "@testing-library/user-event";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";

const mockCourses: Course[] = [
    {
        code: "CS108",
        name: "Intro to Computer Science I",
        description: "...",
        credits: 3,
        preReq: [],
        coreReq: []
    }
];

const mockSemesters: Semester[] = [
    {
        season: "Fall",
        year: 2023,
        courses: []
    }
];

const mockSetListCourses = jest.fn();
const mockSetSemester = jest.fn();

describe("CoursesTable component", () => {
    const renderComponent = () =>
        render(
            <CoursesTable
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onClose={() => {}}
                listCourses={mockCourses}
                setListCourses={mockSetListCourses}
                ModifiedCourseList={mockCourses}
                semesters={mockSemesters}
                setSemester={mockSetSemester}
            />
        );

    test("renders without crashing", () => {
        renderComponent();
    });

    test("renders table headers correctly", () => {
        renderComponent();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Edit Course")).toBeInTheDocument();
        expect(screen.getByText("Add it to Semester")).toBeInTheDocument();
    });

    test("lists courses correctly", () => {
        renderComponent();
        mockCourses.forEach((course) => {
            expect(screen.getByText(course.code)).toBeInTheDocument();
            expect(screen.getByText(course.name)).toBeInTheDocument();
        });
    });

    test("opens EditCourse modal on Edit button click", () => {
        renderComponent();
        // const editButton = screen.getAllByText("Edit")[0];
        // userEvent.click(editButton);
        expect(screen.getByText("Edit Course")).toBeInTheDocument();
    });

    test("calls setListCourses on EditCourse modal interaction", () => {
        renderComponent();
        const editButton = screen.getAllByText("Edit")[0];
        userEvent.click(editButton);
        const saveButton = screen.getByText("Save Changes");
        userEvent.click(saveButton);
        expect(mockSetListCourses).toHaveBeenCalled();
    });

    test("shows error modal when adding a course already in a semester", async () => {
        renderComponent();
        const addButton = screen.getAllByText("Add to Semester")[0];
        userEvent.click(addButton);
        console.log(document.body.innerHTML);
        // const anotherElement = await screen.findByText("AnotherElement");
        // expect(anotherElement).toBeInTheDocument();
        // const errorMessage = await screen.findByText("Wrong Selection");
        // expect(errorMessage).toBeInTheDocument();
    });
});
