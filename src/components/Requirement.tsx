import React, { useState } from "react";
//import { useEffect, useState } from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import { Common } from "../data/Concentration/Common";
import { Button } from "react-bootstrap";

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

export const Requirement = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    const url = getURLs(degreePlan.concentration);
    const [showReq, setShowReq] = useState<boolean>(false);
    const handleShowReq = () => setShowReq(true);
    const handleCloseReq = () => setShowReq(false);

    return (
        <div>
            <div className="concentrationBox">
                <h2>Degree Requirements</h2>
                <p className="reqdesc">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        What classes should I take?
                    </a>
                </p>
            </div>

            <Common
                degreePlan={degreePlan}
                show={showReq}
                handleClose={handleCloseReq}
            ></Common>
        </div>
    );
};
