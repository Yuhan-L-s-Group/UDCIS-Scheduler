import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
interface EditCourseProps {
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    closeEditCourse: () => void;
    CourseSlected: Course;
}
export default function EditCourse({
    listCourses,
    setListCourses,
    closeEditCourse,
    CourseSlected
}: EditCourseProps) {
    const [code, setCode] = useState("1");
    const [name, setName] = useState("2");
    const [description, setDescription] = useState("3");
    const [credits, setCredits] = useState(0);

    const handleSaveChanges = () => {
        const modifyCourse = {
            code: CourseSlected.code,
            name: CourseSlected.name,
            description: CourseSlected.description,
            credits: CourseSlected.credits,
            preReq: [],
            coreReq: []
        };
        const indexOfSelected = listCourses.findIndex(
            (k) => k.code === CourseSlected.code
        );
        listCourses.splice(indexOfSelected, 1);
        const update = [...listCourses];
        update.push(modifyCourse);
        console.log("test edit button save changes: ", listCourses);
        closeEditCourse();
    };
    return (
        <Modal show={true} onHide={closeEditCourse}>
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
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="credits">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control
                            type="text"
                            value={credits}
                            onChange={(e) => setCredits(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeEditCourse}>
                    Reset
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
