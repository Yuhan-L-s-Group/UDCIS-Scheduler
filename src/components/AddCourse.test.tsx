import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCourse } from "./AddCourse";

describe("AddCourse Component Tests", () => {
   test("To save changes when a new course is added", () => {
    const onMock = jest.fn(); // Mock the onClose function
    const setListCoursesMock = jest.fn(); // Mock the setListCourses function

    render(<AddCourse onClose={onMock} listCourses={[]} setListCourses={setListCoursesMock} />);

    // Find form input fields and button
    const cdIN = screen.getByLabelText("Code");
    const nameIn = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const creditsIn = screen.getByLabelText("Credits");
    const saveIT = screen.getByText("Save Changes");

    // Simulate user input
    userEvent.type(cdIN, "CISC300-1");
    userEvent.type(nameIn, "300-Level Technology Elective I");
    userEvent.type(descriptionInput, "Computer science technical electives numbered 301 or above, except for CISC 355, CISC 356, CISC 357, CISC 366, CISC 465, and CISC 466. Because of their very nature, Experimental Courses (courses with an x67 number) must be approved beforehand by the CIS Undergraduate Committee before being accepted toward the technical elective requirement.");
    userEvent.type(creditsIn, "3");

    // Trigger form submission
    userEvent.click(saveIT);

    // Assert that onCloseMock was called, indicating the modal was closed
    expect(onMock).toHaveBeenCalled();

    // Assert that setListCoursesMock was called with the new course
    expect(setListCoursesMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          code: "CISC300-1",
          name: "300-Level Technology Elective I",
          description: "Computer science technical electives numbered 301 or above, except for CISC 355, CISC 356, CISC 357, CISC 366, CISC 465, and CISC 466. Because of their very nature, Experimental Courses (courses with an x67 number) must be approved beforehand by the CIS Undergraduate Committee before being accepted toward the technical elective requirement.", 
          credits: 3,
        })
      ])
    );
  });
  });

  

  test("Form fields are initially empty", () => {
render(
    <AddCourse
      onClose={() => {}}
      listCourses={[]}
      setListCourses={() => {}}
    />
  );

  // Now, you should find the form input fields within the rendered component
  const codeIn = screen.getByLabelText("Code");
  const nameIn = screen.getByLabelText("Name");
  const descriptionInput = screen.getByLabelText("Description");
  const creditsIn = screen.getByLabelText("Credits");

  // Assert that the form fields are initially empty
  expect(codeIn).toHaveValue("");
  expect(nameIn).toHaveValue("");
  expect(descriptionInput).toHaveValue("");
  expect(creditsIn).toHaveValue("");
  });

  test("Entering valid data and submitting the form successfully adds a new course", () => {
    const onMock = jest.fn(); // Mock the onClose function
    const setListCoursesMock = jest.fn(); // Mock the setListCourses function
    render(
      <AddCourse
      onClose= {{}=> {}}
      listCourses={[]}
      setListCourses={()=> {}}
      />
    );

    const codeInput = screen.getByLabelText("Code");
    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const creditsInput = screen.getByLabelText("Credits");
    const saveButton = screen.getByText("Save Changes");

    userEvent.type(codeInput, "CS101");
    userEvent.type(nameInput, "Introduction to Computer Science");
    userEvent.type(descriptionInput, "A beginner-level course in CS.");
    userEvent.type(creditsInput, "3");
    userEvent.click(saveButton);

    // Add assertions to verify the new course is added to the listCourses prop
  });

  test("Entering invalid data shows appropriate validation errors", () => {
    render(<AddCourse onClose={() => {}} listCourses={[]} setListCourses={() => {}} });

    const codeInput = screen.getByLabelText("Code");
    const nameInput = screen.getByLabelText("Name");
    const creditsInput = screen.getByLabelText("Credits");
    const saveButton = screen.getByText("Save Changes");

    // Submit the form with missing description field
    userEvent.type(codeInput, "CISC101");
    userEvent.type(nameInput, "Introduction to Computer Science");
    userEvent.type(creditsInput, "3");
    userEvent.click(saveButton);

    // Ensure validation errors are displayed
    const errorMessages = screen.getAllByText("This field is required");
    expect(errorMessages).toHaveLength(1);
  });

  test("User can cancel adding a course and modal is closed", () => {
    render(<AddCourse onClose={() => {}} listCourses={[]} setListCourses={() => {}} });

    const cancel = screen.getByText("Cancel");
    userEvent.click(cancel);

    // Add assertions to check if the modal is closed
  });

  test("User can add a course with pre-requisites and corequisites", () => {
  const onMock = jest.fn();
  const setListCoursesMock = jest.fn();

  render(
    <AddCourse
      onClose={onMock}
      listCourses={[]}
      setListCourses={setListCoursesMock}
    />
  );

  // Find form input fields
  const codeIn = screen.getByLabelText("Code");
  const nameInput = screen.getByLabelText("Name");
  const descriptionInput = screen.getByLabelText("Description");
  const creditsInput = screen.getByLabelText("Credits");
  const preReqInput = screen.getByLabelText("Pre-Requisites");
  const coreReqInput = screen.getByLabelText("Corequisites");
  const saveButton = screen.getByText("Save Changes");

  // Simulate user input
  userEvent.type(codeIn, "CISC181");
  userEvent.type(nameInput, "Introduction to Computer Science II");
  userEvent.type(descriptionInput, "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation.");
  userEvent.type(creditsInput, "3");
  userEvent.type(preReqInput, "CISC106, CISC108");
  userEvent.type(coreReqInput, "MATH241 | MATH221");

  // Trigger form submission
  userEvent.click(saveButton);

  // Assert that onCloseMock function was called
  expect(onMock).toHaveBeenCalled();

  // Assert that setListCoursesMock function was called with the new course
  expect(setListCoursesMock).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining({
        code: "CISC181",
        name: "Introduction to Computer Science II",
        description: "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation.",
        credits: 3,
        preReq: ["CISC106", "CISC108"],
        coreReq: ["MATH241 | MATH221"],
      })
    ])
  );
  

  test("User can edit an existing course", () => {
    render(<AddCourse onClose={() => {}} listCourses={[]} setListCourses={() => {}} });

    // Test logic for editing an existing course
  });

  test("User can delete an existing course", () => {
    render(<AddCourse onClose={() => {}} listCourses={[]} setListCourses={() => {}} });

    // Test logic for deleting an existing course
  });

  // Add more test cases as needed
});