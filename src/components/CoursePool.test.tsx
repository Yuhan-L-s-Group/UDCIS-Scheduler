import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CoursePool from "./CoursePool";
import { Course } from "../interfaces/course";

describe("CoursePool Component", () => {
    const mockDeletePool = jest.fn();
    const mockAddCourseToDegreePlan = jest.fn();
    const mockSetIsRenderPoolTable = jest.fn();
    const mockSetDragCouse = jest.fn();
    const mockSetCoursePool = jest.fn();
    const dummyCourse: Course = {
        code: "CS101",
        name: "Intro to Computer Science",
        descr: "",
        credits: "4",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    };

    const renderComponent = (coursePool: Course[] = []) =>
        render(
            <CoursePool
                coursePool={coursePool}
                deletePool={mockDeletePool}
                AddCourseToDegreePlan={mockAddCourseToDegreePlan}
                IsRenderPoolTable={true}
                setIsRenderPoolTable={mockSetIsRenderPoolTable}
                DragCouse={dummyCourse}
                setDragCouse={mockSetDragCouse}
                setCoursePool={mockSetCoursePool}
            />
        );

    test("renders course pool table", () => {
        const { getByText } = renderComponent([dummyCourse]);
        expect(getByText("Pool of Courses")).toBeInTheDocument();
        expect(getByText("CS101")).toBeInTheDocument();
    });

    test("calls deletePool function on button click", () => {
        const { getByText } = renderComponent([dummyCourse]);
        fireEvent.click(getByText("x"));
        expect(mockDeletePool).toHaveBeenCalledWith(dummyCourse);
    });

    test("calls AddCourseToDegreePlan function on button click", () => {
        const { getByText } = renderComponent([dummyCourse]);
        fireEvent.click(getByText("Add"));
        expect(mockAddCourseToDegreePlan).toHaveBeenCalledWith(dummyCourse);
    });
});
