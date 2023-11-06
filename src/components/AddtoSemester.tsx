import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Season, Semester } from "../interfaces/semester";

interface AddCoursetoSemesterProp {
    selectedCourse: Course;
    closeAddSemester: () => void;
    semesters: Semester[];
}
export function AddtoSemester({
    selectedCourse,
    closeAddSemester,
    semesters
}: AddCoursetoSemesterProp) {
    const [selectedSemester, setSelectedSemester] = useState<Semester>();
    const handleAddtoSemester = (semester: Semester) => {
        setSelectedSemester(semester);
    };
    const handleChange = () => {
        selectedSemester?.courses.push(selectedCourse);
        console.log(selectedSemester?.courses);
        closeAddSemester();
    };
    return (
        <div>
            <Modal show={true} onHide={closeAddSemester}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose One Semester</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {semesters.length === 0 ? (
                        <span>
                            Please add at least one semester before you pick
                            this button
                        </span>
                    ) : (
                        semesters.map((semester) => (
                            <Button
                                variant="success"
                                key={semester.year + semester.season}
                                onClick={() => handleAddtoSemester(semester)}
                            >
                                {semester.year + " " + semester.season}
                            </Button>
                        ))
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
