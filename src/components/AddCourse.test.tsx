import { AddCourse } from "./AddCourse";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Course } from "../interfaces/course";
import { TwoModals } from "./TwoModals";

describe("AddCourse Component tests", () => {
    //put a state for semesters and setsemesters (ONE STATE) and pass that into modal and you may have to make a blank semester in that state as the initial value
    beforeEach(() => {
        render(<TwoModals></TwoModals>);
    });

    test("Add course form is displayed", () => {
        const AddCourseButton = screen.getByText("Add Course");
        expect(screen.queryByLabelText("Description")).not.toBeInTheDocument();
        AddCourseButton.click();
        expect(screen.queryByLabelText("Description")).toBeInTheDocument();
        const saveButton = screen.getByText("Save Changes");
        saveButton.click();
        expect(screen.queryByLabelText("Description")).not.toBeInTheDocument();
    });

    test("There is a save changes button", () => {
        const saveChangesButton = screen.getByRole("button", {
            name: /Save Changes/i
        });
        expect(saveChangesButton).toBeInTheDocument();
    });
});
