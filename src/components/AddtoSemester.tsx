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
    setSemester: React.Dispatch<React.SetStateAction<Semester[]>>;
}
export function AddtoSemester({
    selectedCourse,
    closeAddSemester,
    semesters,
    setSemester
}: AddCoursetoSemesterProp) {
    const [selectedSemester, setSelectedSemester] = useState<Semester>();
    const handleAddtoSemester = (semester: Semester) => {
        setSelectedSemester(semester);
    };
    const handleChange = () => {
        const RepeatedSemester = semesters.filter((semeseter) =>
            semeseter.courses.includes(selectedCourse)
        );
        if (RepeatedSemester.length === 0) {
            selectedSemester?.courses.push(selectedCourse);
            setSemester([...semesters]);
        }

        // setSemester(}
        //     semesters.map((s) =>
        //         s === selectedSemester
        //             ? { ...s, courses: [...s.courses, selectedCourse] }
        //             : s
        //     )
        // );
        //k
        console.log(semesters);
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
