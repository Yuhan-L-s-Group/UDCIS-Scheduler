/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Concentration, DegreePlan } from "../interfaces/degreePlan";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
// interface CoursesPoolProps {}
interface DegreeManageProps {
    setisDegreePlanOpen: React.Dispatch<React.SetStateAction<boolean>>;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
}
const DegreeManage = ({
    setisDegreePlanOpen,
    degreeList,
    setDegreeList
}: DegreeManageProps) => {
    const selectedDgree = {
        name: "",
        concentration: "" as Concentration,
        semesters: []
    };
    const [name, setName] = useState("Plan A");
    const [concentration, setconcentration] =
        useState<Concentration>("Bachelor of Arts");
    const [errorMessage, setErrorMessage] = useState(false);
    const handleSave = (): void => {
        selectedDgree.name = name;
        selectedDgree.concentration = concentration;
        const Repeated = degreeList.filter(
            (degreePlan) => degreePlan.name === name
        );
        if (Repeated.length === 0) {
            degreeList.push(selectedDgree);
            const update = [...degreeList];
            setDegreeList(update);
            setisDegreePlanOpen(false);
        } else {
            setErrorMessage(true);
        }
    };
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        setErrorMessage(false);
    }
    return (
        <Modal show={true} onHide={() => setisDegreePlanOpen(false)}>
            <Modal.Header closeButton>
                {" "}
                <Modal.Title>Add New Degree Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="Add-New-DegreePlan">
                    <Row>
                        <Col>
                            {" "}
                            <Form.Label>Degree Name: </Form.Label>
                            <Form.Control
                                value={name}
                                onChange={updateName}
                                placeholder="Name Your Degree Plan"
                            ></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {" "}
                            <Form.Label>Concentration: </Form.Label>
                            <Form.Select
                                value={concentration}
                                onChange={(e) =>
                                    setconcentration(
                                        e.target.value as Concentration
                                    )
                                }
                            >
                                <option value="Bachelor of Arts">
                                    Bachelor of Arts
                                </option>
                                <option value="Bachelor of Science">
                                    Bachelor of Science
                                </option>
                                <option value="Artificial Intelligence and Robotics">
                                    Artificial Intelligence and Robotics
                                </option>
                                <option value="Bioinformatics">
                                    Bioinformatics
                                </option>
                                <option value="Cybersecurity">
                                    Cybersecurity
                                </option>
                                <option value="Data Science">
                                    Data Science
                                </option>
                                <option value="High Performance Computing">
                                    High Performance Computing
                                </option>
                                <option value="Systems and Networks">
                                    Systems and Networks
                                </option>
                                <option value=" Theory and Computation">
                                    Theory and Computation
                                </option>
                                <option value="Information Systems">
                                    Information Systems
                                </option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                {errorMessage ? (
                    <div>
                        You have already created a degree plan named by {name}{" "}
                    </div>
                ) : null}
                <br />
                <br />
                <Button onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default DegreeManage;
