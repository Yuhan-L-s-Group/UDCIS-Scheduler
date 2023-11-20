import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Courses from "../data/CourseList.json";
//Edit current courses information
interface EditCourseProps {
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    closeEditCourse: () => void;
    CourseSlected: Course;
    ModifiedCourseList: Course[];
}
export default function EditCourse({
    setListCourses,
    closeEditCourse,
    CourseSlected,
    ModifiedCourseList
}: EditCourseProps) {
    const [code, setCode] = useState(CourseSlected.code);
    const [name, setName] = useState(CourseSlected.name);
    const [credits, setCredits] = useState(CourseSlected.credits);
    const modifyCourse = {
        code: CourseSlected.code,
        name: CourseSlected.name,
        descr: CourseSlected.descr,
        credits: CourseSlected.credits,
        preReq: CourseSlected.preReq,
        restrict: CourseSlected.restrict,
        breadth: CourseSlected.breadth,
        typ: CourseSlected.typ
    };
    const handleSaveChanges = () => {
        if (CourseSlected.code !== code) {
            modifyCourse.code = code;
        }
        if (CourseSlected.name !== name) {
            modifyCourse.name = name;
        }

        if (CourseSlected.credits !== credits) {
            modifyCourse.credits = credits;
        }

        const indexOfSelected = ModifiedCourseList.findIndex(
            (course) => course.code === CourseSlected.code
        );
        ModifiedCourseList.splice(indexOfSelected, 1, modifyCourse);
        const update = [...ModifiedCourseList];
        setListCourses(update);
        closeEditCourse();
    };
    const handleReset = () => {
        const update = [...Courses];
        setListCourses(update);
        closeEditCourse();
    };
    return (
        <Modal show={true} onHide={closeEditCourse} animation={false}>
            {" "}
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="code">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="credits">
                        <Form.Label>Credits (please enter number)</Form.Label>
                        <Form.Control
                            type="number"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
