import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Season, Semester } from "../interfaces/semester";

interface AddCoursetoSemesterProp {
    selectedCourse: Course;
    closeAddSemester: () => void;
}
export function AddtoSemester({
    selectedCourse,
    closeAddSemester
}: AddCoursetoSemesterProp) {
    const handleChange = () => {
        closeAddSemester();
    };
    return (
        <div>
            <Modal show={true} onHide={closeAddSemester}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>Blank form needs to be filled out</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
