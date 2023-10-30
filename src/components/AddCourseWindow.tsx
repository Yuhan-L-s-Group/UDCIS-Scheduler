import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface AddCourseWindowProps {
    onClose: () => void;
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
}

export function AddCourseWindow({
    onClose,
    listCourses,
    setListCourses
}: AddCourseWindowProps) {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState(0);

    const handleConfirm = () => {
        const courseObject = {
            code: code,
            name: name,
            description: description,
            credits: credits,
            preReq: [],
            coreReq: []
        };
        const updated = [...listCourses];
        updated.push(courseObject);
        setListCourses(updated);
        console.log("Entered Course Data:", courseObject);
        console.log(updated);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            {" "}
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
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
                            type="number"
                            value={credits}
                            onChange={(e) => setCredits(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
