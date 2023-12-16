import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditCourse from "./EditCourse";
import { Course } from "../interfaces/course";

const mockCourse: Course = {
    code: "CS101",
    name: "Introduction to Computer Science",
    descr: "A foundational course in computer science.",
    credits: "3",
    preReq: "None",
    restrict: "None",
    breadth: "University breadth requirement",
    typ: "Core"
};

const mockCourseList: Course[] = [];

const mockSetListCourses = jest.fn();
const mockCloseEditCourse = jest.fn();

describe("EditCourse Component", () => {
    test("renders with selected course data", () => {
        const { getByLabelText } = render(
            <EditCourse
                listCourses={mockCourseList}
                setListCourses={mockSetListCourses}
                closeEditCourse={mockCloseEditCourse}
                CourseSlected={mockCourse}
                ModifiedCourseList={mockCourseList}
            />
        );

        expect(getByLabelText("Code")).toHaveValue(mockCourse.code);
        expect(getByLabelText("Name")).toHaveValue(mockCourse.name);
    });

    test("calls setListCourses on form submission", () => {
        const { getByText, getByLabelText } = render(
            <EditCourse
                listCourses={mockCourseList}
                setListCourses={mockSetListCourses}
                closeEditCourse={mockCloseEditCourse}
                CourseSlected={mockCourse}
                ModifiedCourseList={mockCourseList}
            />
        );

        const saveButton = getByText("Save Changes");
        fireEvent.click(saveButton);

        expect(mockSetListCourses).toHaveBeenCalled();
        expect(mockCloseEditCourse).toHaveBeenCalled();
    });
});
