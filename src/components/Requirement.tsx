import React from "react";
//import { useEffect,  } from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import { CommonRequirement } from "./CommonRequirement";
import { Button, Modal } from "react-bootstrap";

export function getURLs(conc: string): string {
    const URLS: Record<string, string> = {
        "Bachelor of Arts":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34726",
        "Bachelor of Science":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34727",
        "Artificial Intelligence and Robotics":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34982",
        Bioinformatics:
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34983",
        Cybersecurity:
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34981",
        "Data Science":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34980",
        "High Performance Computing (Applied Math Track)":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34984",
        "High Performance Computing (Data Track)":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34984",
        "Systems and Networks":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34985",
        "Theory and Computation (Discrete Track)":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34979",
        "Theory and Computation (Continuous Track)":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34979"
    };
    return URLS[conc];
}

export const Requirement = ({
    degreePlan,
    show,
    handleClose
}: {
    degreePlan: DegreePlan;
    show: boolean;
    handleClose: () => void;
}) => {
    const url = getURLs(degreePlan.concentration);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="requirement-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Degree Requirements</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    What classes should I take?
                </a>
                <br></br>
                <br></br>
                <CommonRequirement degreePlan={degreePlan}></CommonRequirement>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
