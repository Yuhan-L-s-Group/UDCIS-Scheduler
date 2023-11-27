import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditCourse from "./EditCourse";

describe("EditCourse Component", () => {
    const mockCloseEditCourse = jest.fn();
    const mockSetListCourses = jest.fn();
    const mockCourseSelected = {
        code: "CISC108",
        name: "Introduction to Computer Science I",
        description:
            "Computing and principles of programming with an emphasis on systematic program design.",
        credits: 3,
        preReq: [],
        coreReq: []
    };
    const mockModifiedCourseList = [mockCourseSelected];

    beforeEach(() => {
        render(
            <EditCourse
                listCourses={mockModifiedCourseList}
                setListCourses={mockSetListCourses}
                closeEditCourse={mockCloseEditCourse}
                CourseSlected={mockCourseSelected}
                ModifiedCourseList={mockModifiedCourseList}
            />
        );
    });

    it("renders the EditCourse modal with the correct initial values", () => {
        expect(screen.getByLabelText("Code")).toHaveValue(
            mockCourseSelected.code
        );
        expect(screen.getByLabelText("Name")).toHaveValue(
            mockCourseSelected.name
        );
        expect(
            screen.getByLabelText("Credits (please enter number)")
        ).toHaveValue(mockCourseSelected.credits);
    });

    it("calls closeEditCourse when the close button is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(mockCloseEditCourse).toHaveBeenCalled();
    });

    it("updates the course list and closes the modal when Save Changes is clicked", () => {
        const newCode = "CISC181";
        fireEvent.change(screen.getByLabelText("Code"), {
            target: { value: newCode }
        });
        fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

        expect(mockSetListCourses).toHaveBeenCalledWith(expect.any(Array));
        expect(mockSetListCourses).toBeCalledWith(
            expect.arrayContaining([expect.objectContaining({ code: newCode })])
        );
        expect(mockCloseEditCourse).toHaveBeenCalled();
    });

    it("resets the course list and closes the modal when Reset is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /reset/i }));
        expect(mockSetListCourses).toHaveBeenCalledWith(expect.any(Array));
        expect(mockCloseEditCourse).toHaveBeenCalled();
    });
});
