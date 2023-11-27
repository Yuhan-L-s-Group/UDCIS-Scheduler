/* eslint-disable no-extra-parens */
import { Button } from "react-bootstrap";
import "./courseTable.css";
import EditCourse from "./EditCourse";
import React, { useState } from "react";
import { AddtoSemester } from "./AddtoSemester";
import { Semester } from "../interfaces/semester";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// display course list (switch 1)
interface Course {
    code: string;
    name: string;
    description: string;
    credits: number;
    preReq: string[];
    coreReq: string[];
}
interface EditCourseProps {
    onClose: () => void;
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    ModifiedCourseList: Course[];
    semesters: Semester[];
    setSemester: React.Dispatch<React.SetStateAction<Semester[]>>;
}

const CoursesTable = ({
    listCourses,
    setListCourses,
    ModifiedCourseList,
    semesters,
    setSemester
}: EditCourseProps) => {
    const categorizedCourses = listCourses.reduce((acc, course) => {
        const prefix = course.code.substring(0, 4);
        if (!acc[prefix]) {
            acc[prefix] = [];
        }
        acc[prefix].push(course);
        return acc;
    }, {} as Record<string, Course[]>);
    const [isEditCourseOpen, setEditCourseOpen] = useState(false);
    const [selectedCourse, setselectedCourse] = useState<Course>({
        code: "",
        name: "",
        description: "",
        credits: 0,
        preReq: [],
        coreReq: []
    });
    const [isAddSemesterOpen, SetAddSemester] = useState(false);
    const [ErrorMessage, setError] = useState(false);

    const closeEditCourse = () => {
        setEditCourseOpen(false);
    };
    const gotYouCourse = (course: Course) => {
        setselectedCourse(course);
        setEditCourseOpen(true);
    };
    const gotYouCourse2 = (course: Course) => {
        setselectedCourse(course);
        SetAddSemester(true);
    };

    const closeAddSemester = () => {
        SetAddSemester(false);
    };
    const CloseError = () => {
        setError(false);
    };
    const handleError = (course: Course) => {
        const repeatedCourse = semesters.filter((semester) =>
            semester.courses.includes(course)
        );
        if (repeatedCourse.length !== 0) {
            setError(true);
        } else {
            gotYouCourse2(course);
        }
    };

    return (
        <div>
            {Object.entries(categorizedCourses).map(([prefix, listCourses]) => (
                <div key={prefix} className="tableBetween">
                    <Form.Group controlId="DropDownCourses">
                        <table className="Tablesize">
                            <thead>
                                <tr>
                                    <th>Code:{prefix}</th>
                                    <th>Name</th>
                                    <th>Edit Course</th>
                                    <th>Add it to Semester</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCourses.map((course: Course) => (
                                    <tr key={course.code}>
                                        <td>{course.code}</td>
                                        <td>{course.name}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    gotYouCourse(course)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            {isEditCourseOpen && (
                                                <div>
                                                    <EditCourse
                                                        listCourses={
                                                            listCourses
                                                        }
                                                        setListCourses={
                                                            setListCourses
                                                        }
                                                        closeEditCourse={
                                                            closeEditCourse
                                                        }
                                                        CourseSlected={
                                                            selectedCourse
                                                        }
                                                        ModifiedCourseList={
                                                            ModifiedCourseList
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </td>
                                        <td className="adjustrow">
                                            <Button
                                                onClick={() =>
                                                    handleError(course)
                                                }
                                                variant="success"
                                            >
                                                Add to Semester
                                            </Button>
                                            {isAddSemesterOpen ? (
                                                <div>
                                                    <AddtoSemester
                                                        selectedCourse={
                                                            selectedCourse
                                                        }
                                                        closeAddSemester={
                                                            closeAddSemester
                                                        }
                                                        semesters={semesters}
                                                        setSemester={
                                                            setSemester
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    {ErrorMessage && (
                                                        <Modal
                                                            show={true}
                                                            onHide={CloseError}
                                                        >
                                                            <Modal.Header
                                                                closeButton
                                                            >
                                                                <Modal.Title className="modifyErrorTitle">
                                                                    Wrong
                                                                    Selection
                                                                </Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                You have already
                                                                selected this
                                                                course. Please
                                                                make sure you do
                                                                not select the
                                                                same course.
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={
                                                                        CloseError
                                                                    }
                                                                >
                                                                    Close
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Form.Group>
                </div>
            ))}
        </div>
    );
};

export default CoursesTable;
