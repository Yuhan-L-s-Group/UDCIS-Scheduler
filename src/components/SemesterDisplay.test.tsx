import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SemesterDisplay } from "./SemesterDisplay";

describe("SemesterDisplay Component", () => {
    const semester = {
        season: "Spring",
        year: 2022,
        courses: [
            { code: "CSCI101", name: "Introduction to Computer Science" },
            { code: "MATH202", name: "Calculus II" }
        ]
    };

    const deleteSemesterMock = jest.fn();

    test("renders SemesterDisplay correctly", () => {
        render(
            <SemesterDisplay
                semester={semester}
                deleteSemester={deleteSemesterMock}
            />
        );

        // Check if semester information is rendered
        expect(
            screen.getByText(`${semester.season} ${semester.year}`)
        ).toBeInTheDocument();

        // Check if delete button is rendered
        expect(
            screen.getByRole("button", { name: /delete/i })
        ).toBeInTheDocument();

        // Check if each course is rendered
        semester.courses.forEach((course) => {
            expect(
                screen.getByText(`${course.code} ${course.name}`)
            ).toBeInTheDocument();
        });
    });

    test("calls deleteSemester when delete button is clicked", () => {
        render(
            <SemesterDisplay
                semester={semester}
                deleteSemester={deleteSemesterMock}
            />
        );

        // Trigger delete button click
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        // Check if deleteSemester is called with the correct arguments
        expect(deleteSemesterMock).toHaveBeenCalledWith(
            semester.season,
            semester.year
        );
    });

    // You can add more tests for the AddCourse functionality if needed
});
