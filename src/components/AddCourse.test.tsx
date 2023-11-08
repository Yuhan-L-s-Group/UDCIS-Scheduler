import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AddCourse } from "./AddCourse";
import sampleCourses from "../data/course.json";

describe("AddCourse", () => {
    const mockOnClose = jest.fn();
    const mockSetListCourses = jest.fn();

    beforeEach(() => {
        render(
            <AddCourse
                onClose={mockOnClose}
                listCourses={sampleCourses}
                setListCourses={mockSetListCourses}
            />
        );
    });

    test("renders the add course modal", () => {
        // 1
    });

    test("allows input for new course details", () => {
        // 1
    });

    test("calls setListCourses with new course on save", () => {
        fireEvent.change(screen.getByLabelText("Code"), {
            target: { value: "NEW101" }
        });
        fireEvent.change(screen.getByLabelText("Name"), {
            target: { value: "New Course" }
        });
        fireEvent.change(screen.getByLabelText("Description"), {
            target: { value: "A new course description." }
        });
        fireEvent.change(screen.getByLabelText("Credits"), {
            target: { value: "4" }
        });

        fireEvent.click(screen.getByText("Save Changes"));
        expect(mockSetListCourses).toHaveBeenCalledWith([
            ...sampleCourses,
            {
                code: "NEW101",
                name: "New Course",
                description: "A new course description.",
                credits: 4,
                preReq: [],
                coreReq: []
            }
        ]);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
