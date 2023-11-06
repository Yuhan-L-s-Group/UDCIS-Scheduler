import React from "react";
import { render, screen } from "@testing-library/react";
import Courses from "../data/course.json";
import SemesterDisplay from "../components/SemesterDisplay";
import { TwoModals } from "../components/TwoModals";
import { AddCourse } from "../components/AddCourse";
import CoursesTable from "../components/courseTable";
import EditCourse from "../components/EditCourse";
import { Season, Semester } from "./semester";
import { Course } from "./course";

describe("SemesterDisplay Component", () => {
    test("renders SemesterDisplay component", () => {
        render(<SemesterDisplay />);
        const addButton = screen.getByText(/Add Semester/i);
        expect(addButton).toBeInTheDocument();
    });

    test("adds a new semester and displays it", () => {
        render(<SemesterDisplay />);
        const addButton = screen.getByText(/Add Semester/i);
        addButton.click();

        const seasonSelect = screen.getByLabelText(/Season/i);
        seasonSelect.value = "Fall";

        const yearInput = screen.getByLabelText(/Year/i);
        yearInput.value = "2023";

        const addButtonInModal = screen.getByText(/ADD/i);
        addButtonInModal.click();

        const addedSemester = screen.getByText(/Fall 2023/i);
        expect(addedSemester).toBeInTheDocument();
    });
});

describe("TwoModals Component", () => {
    test("renders TwoModals component", () => {
        render(<TwoModals />);
        const addButton = screen.getByText(/Add Course/i);
        expect(addButton).toBeInTheDocument();
    });

    test("opens and closes the AddCourse modal", () => {
        render(<TwoModals />);
        const addButton = screen.getByText(/Add Course/i);
        addButton.click();

        const addCourseModal = screen.getByText(/Add Course/i);
        expect(addCourseModal).toBeInTheDocument();

        const closeButton = screen.getByText(/Close/i);
        closeButton.click();

        expect(addCourseModal).not.toBeInTheDocument();
    });
});

describe("AddCourse Component", () => {
    test("renders AddCourse component", () => {
        render(<AddCourse />);
        const saveButton = screen.getByText(/Save Changes/i);
        expect(saveButton).toBeInTheDocument();
    });

    test("adds a new course to the list", () => {
        render(<AddCourse />);
        const codeInput = screen.getByLabelText(/Code/i);
        const nameInput = screen.getByLabelText(/Name/i);

        codeInput.value = "CS101";
        nameInput.value = "Introduction to Computer Science";

        const saveButton = screen.getByText(/Save Changes/i);
        saveButton.click();

        const newCourse = screen.getByText(/CS101/i);
        expect(newCourse).toBeInTheDocument();
    });
});

describe("CoursesTable Component", () => {
    test("renders CoursesTable component", () => {
        render(<CoursesTable listCourses={Courses} />);
        const courseCode = screen.getByText(/Course Code/i);
        expect(courseCode).toBeInTheDocument();
    });

    test("edits a course and updates the list", () => {
        render(<CoursesTable listCourses={Courses} />);
        const editButton = screen.getByText(/Edit/i);
        editButton.click();

        const editCourseModal = screen.getByText(/Edit Course/i);
        expect(editCourseModal).toBeInTheDocument();

        const closeButton = screen.getByText(/Close/i);
        closeButton.click();

        expect(editCourseModal).not.toBeInTheDocument();
    });
});
