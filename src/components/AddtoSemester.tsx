/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Semester } from "../interfaces/semester";

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
        setRenderSemester(true);
    };
    const [isRenderSemester, setRenderSemester] = useState(false);

    const handleChange = () => {
        const RepeatedSemester = semesters.filter((semeseter) =>
            semeseter.courses.includes(selectedCourse)
        );
        if (RepeatedSemester.length === 0) {
            selectedSemester?.courses.push(selectedCourse);
            setSemester([...semesters]);
        }
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
                        <>
                            {semesters.map((semester) => (
                                <div key={semester.year + semester.season}>
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            handleAddtoSemester(semester)
                                        }
                                    >
                                        {semester.year + " " + semester.season}
                                    </Button>
                                    <br />
                                </div>
                            ))}
                            <div>
                                {isRenderSemester && (
                                    <div>
                                        {"You just selected: "}{" "}
                                        {selectedSemester?.year}{" "}
                                        {selectedSemester?.season}
                                    </div>
                                )}
                            </div>
                        </>
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
