import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Concentration, DegreePlan } from "../interfaces/degreePlan";

export const AddPlanModal = ({
    show,
    handleClose,
    addPlan,
    degreePlans
}: {
    show: boolean;
    handleClose: () => void;
    addPlan: (name: string, concentration: Concentration) => void;
    degreePlans: DegreePlan[];
}) => {
    const [name, setName] = useState<string>("Default Degree Plan");
    const [concentration, setConcentration] = useState<Concentration>(
        "Bachelor of Science"
    );
    const [warn, setWarn] = useState<string>("");

    const savePlan = (): void => {
        if (degreePlans.filter((plan) => plan.name === name).length > 0) {
            setWarn("Please enter a different name for your degree plan!");
        } else {
            addPlan(name, concentration);
            setName("Default Degree Plan");
            setConcentration("Bachelor of Science");
            setWarn("");
            handleClose();
        }
    };

    function updateCon(event: React.ChangeEvent<HTMLSelectElement>) {
        setConcentration(event.target.value as Concentration);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Degree Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="Add-Degree-Plan">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                        ></Form.Control>
                        <Form.Label>Concentration:</Form.Label>
                        <Form.Select value={concentration} onChange={updateCon}>
                            {[
                                "Bachelor of Arts",
                                "Bachelor of Science",
                                "Artificial Intelligence and Robotics",
                                "Bioinformatics",
                                "Cybersecurity",
                                "Data Science",
                                "High Performance Computing",
                                "Systems and Networks",
                                "Theory and Computation",
                                "Information Systems"
                            ].map((concentration: string) => {
                                return (
                                    <option
                                        key={concentration}
                                        value={concentration}
                                    >
                                        {concentration}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <p id="alert">{warn}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setName("Default Degree Plan");
                            setConcentration("Bachelor of Science");
                            setWarn("");
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={savePlan}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
