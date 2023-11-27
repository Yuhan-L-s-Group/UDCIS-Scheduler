import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../App.css";
// Dropdown menu for users selecting different concentrations but it doesnt work so far
const DEGREES = [
    "Bachelor of Arts",
    "Bachelor of Science (not ready)",
    "Artificial Intelligence and Robotics (not ready)",
    "Bioinformatics (not ready)",
    "Cybersecurity (not ready)",
    "Data Science (not ready)",
    "High Performance Computing (not ready)",
    "Systems and Networks (not ready)",
    "Theory and Computation (not ready)",
    "Information Systems (not ready)"
];
const DEFAULT_DEGREE = DEGREES[0];

export function SwitchPlan(): JSX.Element {
    const [degree, setDegree] = useState<string>(DEFAULT_DEGREE);

    return (
        <div>
            <br />
            <Form.Group controlId="choseDegree">
                <Form.Label className="degreeSelect">
                    <Form.Select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                    >
                        {DEGREES.map((degree: string) => {
                            return (
                                <option key={degree} value={degree}>
                                    {degree}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Label>
            </Form.Group>
            <span className="degreePrompt">
                The current degree you are working with is {degree}.
            </span>
        </div>
    );
}
