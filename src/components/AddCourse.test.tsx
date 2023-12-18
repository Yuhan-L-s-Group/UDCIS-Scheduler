import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddCourse } from "./AddCourse";
import { Course } from "../interfaces/course";

describe("AddCourse Component", () => {
    const mockOnClose = jest.fn();
    const mockSetPool = jest.fn();
    const listCourses: Course[] = [];
    const pool: Course[] = [];

    const renderComponent = () =>
        render(
            <AddCourse
                onClose={mockOnClose}
                listCourses={listCourses}
                pool={pool}
                setPool={mockSetPool}
            />
        );

    test("renders input fields and submit button", () => {
        const { getByPlaceholderText } = renderComponent();

        expect(getByPlaceholderText("Course Code")).toBeInTheDocument();
        expect(getByPlaceholderText("Course Name")).toBeInTheDocument();
        expect(getByPlaceholderText("Course Credits")).toBeInTheDocument();
        expect(getByPlaceholderText("Course Breadth")).toBeInTheDocument();
        expect(getByPlaceholderText("Submit")).toBeInTheDocument();
    });

    test("allows the user to enter a course code", () => {
        const { getByPlaceholderText } = renderComponent();
        const inputCode = getByPlaceholderText(
            "Course Code"
        ) as HTMLInputElement;
        fireEvent.change(inputCode, { target: { value: "CS101" } });
        expect(inputCode.value).toBe("CS101");
    });

    test("calls handleConfirm on form submission", () => {
        const { getByPlaceholderText } = renderComponent();
        const submitButton = getByPlaceholderText("Submit");
        fireEvent.click(submitButton);
        expect(mockSetPool).toHaveBeenCalled();
    });
});
