import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

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
        "High Performance Computing":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34984",
        "Systems and Networks":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34985",
        "Theory and Computation":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34979",
        "Information Systems":
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34728"
    };
    return URLS[conc];
}

export const Requirement = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    const url = getURLs(degreePlan.concentration);

    const printAll = () => {
        console.log(degreePlan.concentration);
    };

    return (
        <Col className="sidecolumns" id="move-when-scroll">
            <h2 className="subtitle">Degree Requirements</h2>
            <p className="reqdesc">
                *See the{" "}
                <a href={url} target="_blank" rel="noopener noreferrer">
                    UD Catalog
                </a>{" "}
                for full requirement descriptions.
            </p>
            <Button onClick={printAll}>Print url</Button>
        </Col>
    );
};
