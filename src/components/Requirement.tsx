import React from "react";
//import { useEffect, useState } from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import { Common } from "../data/Concentration/Common";
import { Commoon } from "../data/Concentration/Commoon";

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
            "https://catalog.udel.edu/preview_program.php?catoid=47&poid=34979"
    };
    return URLS[conc];
}

export const Requirement = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    const url = getURLs(degreePlan.concentration);

    return (
        <div className="concentrationBox">
            <h2>Degree Requirements</h2>
            <p className="reqdesc">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    What classes should I take?
                </a>
            </p>
            <Commoon degreePlan={degreePlan}></Commoon>
        </div>
    );
};
