/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// Add new courses into current course list
interface AddCourseWindowProps {
    onClose: () => void;
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    pool: Course[];
    setPool: (courses: Course[]) => void;
}

export function AddCourse({
    onClose,
    listCourses,
    setListCourses,
    pool,
    setPool
}: AddCourseWindowProps) {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState("");
    const [breadth, setBreadth] = useState("");
    const [isAdded, setAdded] = useState(false);
    const handleConfirm = () => {
        const courseObject = {
            code: code,
            name: name,
            descr: "",
            credits: credits,
            preReq: "",
            restrict: "",
            breadth: breadth,
            typ: ""
        };
        const indexCourse = listCourses.findIndex(
            (course) =>
                courseObject.code === course.code &&
                courseObject.name === course.name &&
                parseInt(courseObject.credits) === parseInt(course.credits) &&
                courseObject.descr === course.descr
        );
        if (indexCourse !== -1) {
            setAdded(true);
        } else {
            //const updated = [...listCourses];
            const updated = [...pool];
            updated.push(courseObject);
            //setListCourses(updated);
            setPool(updated);
            onClose();
        }
        console.log(indexCourse);
    };
    function updateBreadth(event: React.ChangeEvent<HTMLSelectElement>) {
        setBreadth(event.target.value);
    }

    return (
        <Modal show={true} onHide={onClose}>
            {" "}
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Code:</Form.Label>
                        <Form.Control
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="credits">
                        <Form.Label>Credits:</Form.Label>
                        <Form.Control
                            type="number"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="breadth">
                        <Form.Label>Breadth Requirements:</Form.Label>
                        <Form.Select value={breadth} onChange={updateBreadth}>
                            {[
                                "Creative Arts and Humanities",
                                "History and Cultural Change",
                                "Social and Behavioral Sciences",
                                "Math, Natural Science and Technology",
                                "N/A"
                            ].map((breadth: string) => {
                                return (
                                    <option key={breadth} value={breadth}>
                                        {breadth}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isAdded && (
                    <div>
                        You have already added this course to course list!{" "}
                    </div>
                )}
                <Button variant="primary" onClick={handleConfirm}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
