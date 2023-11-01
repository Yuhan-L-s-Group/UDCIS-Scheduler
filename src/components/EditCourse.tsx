import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
interface EditCourseProps {
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    closeEditCourse: () => void;
}
export default function EditCourse({
    listCourses,
    setListCourses,
    closeEditCourse
}: EditCourseProps) {
    const originalListCopy = listCourses;
    const [originalList, setListCoursesR] =
        useState<Course[]>(originalListCopy);

    const handleConfirm = () => {
        setListCourses(updated);
    };
    const [code, setCode] = useState("2");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState(0);
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
                    Close
                </Button>
                <Button variant="primary" onClick={closeEditCourse}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
