import React, { useState } from "react";
import { Form } from "react-bootstrap";

const DEGREES = [
    "Bachelor of Arts",
    "Bachelor of Science(not ready)",
    "Artificial Intelligence and Robotics(not ready)",
    "Bioinformatics(not ready)",
    "Cybersecurity(not ready)",
    "Data Science(not ready)",
    "High Performance Computing(not ready)",
    "Systems and Networks(not ready)",
    "Theory and Computation(not ready)",
    "Information Systems(not ready)"
];
const DEFAULT_DEGREE = DEGREES[0];

export function SwitchPlan(): JSX.Element {
    const [degree, setDegree] = useState<string>(DEFAULT_DEGREE);

    function updateDegree(event: React.ChangeEvent<HTMLSelectElement>) {
        setDegree(event.target.value);
    }

    return (
        <div>
            <Form.Group controlId="choseDegree">
                <Form.Label></Form.Label>
                <Form.Select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                >
                    {DEGREES.map((degree: string) => (
                        <option key={degree} value={degree}>
                            {degree}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <span>The current degree you are working with is {degree}.</span>
        </div>
    );
}
