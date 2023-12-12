/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SemesterModal } from "./SemesterModal";
import { Semester, Season } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

describe("SemesterModal Component", () => {
    const mockHandleClose = jest.fn();
    const mockSetDegreeList = jest.fn();
    const mockModifysemster = jest.fn();
    const dummySemesters: Semester[] = [];
    const selectedDegreePlan: DegreePlan = {
        name: "",
        concentration: "Bachelor of Arts",
        semesters: []
    };
    const degreeList: DegreePlan[] = [];

    test("renders the modal when showAddSemester is true", () => {
        const { getByText } = render(
            <SemesterModal
                showAddSemester={true}
                handleClose={mockHandleClose}
                semesters={dummySemesters}
                SelecetedEditdDegreePlan={selectedDegreePlan}
                degreeList={degreeList}
                setDegreeList={mockSetDegreeList}
                modifysemster={mockModifysemster}
            />
        );
        expect(getByText("Add New Semester")).toBeInTheDocument();
    });

    test("does not render the modal when showAddSemester is false", () => {
        const { queryByText } = render(
            <SemesterModal
                showAddSemester={false}
                handleClose={mockHandleClose}
                semesters={dummySemesters}
                SelecetedEditdDegreePlan={selectedDegreePlan}
                degreeList={degreeList}
                setDegreeList={mockSetDegreeList}
                modifysemster={mockModifysemster}
            />
        );
        expect(queryByText("Add New Semester")).not.toBeInTheDocument();
    });
});
