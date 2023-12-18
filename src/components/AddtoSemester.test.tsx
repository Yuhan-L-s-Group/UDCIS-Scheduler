import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { AddtoSemester } from "./AddtoSemester";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

const mockCourse: Course = {
    code: "",
    name: "",
    descr: "",
    credits: "",
    preReq: "",
    restrict: "",
    breadth: "",
    typ: ""
};

const mockSemester: Semester = {
    season: "Fall",
    year: 0,
    courses: []
};

const mockSemesters: Semester[] = [mockSemester];

const mockCloseAddSemester = jest.fn();
const mockSetSemester = jest.fn();

describe("AddtoSemester Component", () => {
    test("renders without crashing", () => {
        render(
            <AddtoSemester
                selectedCourse={mockCourse}
                closeAddSemester={mockCloseAddSemester}
                semesters={mockSemesters}
                setSemester={mockSetSemester}
            />
        );
    });

    test("opens and closes the modal correctly", async () => {
        const { getByRole, queryByRole } = render(
            <AddtoSemester
                selectedCourse={mockCourse}
                closeAddSemester={mockCloseAddSemester}
                semesters={mockSemesters}
                setSemester={mockSetSemester}
            />
        );

        fireEvent.click(
            getByRole("button", { name: /add course to semester/i })
        );
        expect(queryByRole("dialog")).toBeInTheDocument();
        fireEvent.click(getByRole("button", { name: /close/i }));
        await waitFor(() => {
            expect(queryByRole("dialog")).not.toBeInTheDocument();
        });
    });
});
