import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SemesterList } from "./SemesterList";

describe("SemesterList Component", () => {
    const semesters = [
        // Add sample semesters for testing
        { season: "Spring", year: 2022 },
        { season: "Fall", year: 2022 }
    ];

    test("renders SemesterList correctly", () => {
        render(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <SemesterList semesters={semesters} deleteSemester={() => {}} />
        );

        // Check if each semester is rendered
        semesters.forEach((semester) => {
            const semesterElement = screen.getByText(
                `${semester.season} ${semester.year}`
            );
            expect(semesterElement).toBeInTheDocument();
        });
    });

    test("calls deleteSemester when delete button is clicked", () => {
        const deleteSemesterMock = jest.fn();
        render(
            <SemesterList
                semesters={semesters}
                deleteSemester={deleteSemesterMock}
            />
        );

        // Trigger delete for each semester
        semesters.forEach((semester) => {
            const deleteButton = screen.getByRole("button", {
                name: `Delete ${semester.season} ${semester.year}`
            });
            userEvent.click(deleteButton);
            expect(deleteSemesterMock).toHaveBeenCalledWith(
                semester.season,
                semester.year
            );
        });
    });
});
