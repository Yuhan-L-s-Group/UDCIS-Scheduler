import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, fireEvent } from "@testing-library/react";
import EditDegreePlan from "./EditDegreePlan";
import { DegreePlan } from "../interfaces/degreePlan";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

describe("EditDegreePlan Component", () => {
    // Mock functions and data
    const mockModifysemster = jest.fn();
    const mockClearAllinDegreePlan = jest.fn();
    const mockHandleShowModal = jest.fn();
    const mockHandleClose = jest.fn();
    const mockSetIsEditDegreeOpen = jest.fn();
    const mockSetIsdegreeList = jest.fn();
    const mockSetIsaddDegreeButton = jest.fn();
    const mockSetDegreeList = jest.fn();
    const mockSetCoursePool = jest.fn();
    const mockSetDragCouse = jest.fn();

    const dummySemesters: Semester[] = [];
    const selectedDegreePlan: DegreePlan = {
        name: "",
        concentration: "Bachelor of Arts",
        semesters: []
    };
    const degreeList: DegreePlan[] = [];
    const coursePool: Course[] = [];
    const mockDragCouse: Course = {
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    };

    const renderComponent = () =>
        render(
            <EditDegreePlan
                semesters={dummySemesters}
                Name="Test Plan"
                renderName={true}
                modifysemster={mockModifysemster}
                isDisplayEmpty={false}
                clearAllinDegreePlan={mockClearAllinDegreePlan}
                handleShowModal={mockHandleShowModal}
                showAddSemester={false}
                handleClose={mockHandleClose}
                setIsEditDegreeOpen={mockSetIsEditDegreeOpen}
                setIsdegreeList={mockSetIsdegreeList}
                setIsaddDegreeButton={mockSetIsaddDegreeButton}
                SelecetedEditdDegreePlan={selectedDegreePlan}
                degreeList={degreeList}
                setDegreeList={mockSetDegreeList}
                setCoursePool={mockSetCoursePool}
                coursePool={coursePool}
                DragCouse={mockDragCouse}
                setDragCouse={mockSetDragCouse}
            />
        );

    test("renders EditDegreePlan components and elements", () => {
        const { getByText } = renderComponent();
        expect(getByText("Edit Degree Plan")).toBeInTheDocument();
    });
});
