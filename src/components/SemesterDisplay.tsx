import React from "react";
import { Season, Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";

export const SemesterDisplay = ({
    semester,
    deleteSemester
}: {
    semester: Semester;
    deleteSemester: (season: Season, year: number) => void;
}): JSX.Element => {
    return (
        <div>
            <strong>
                {semester.season} {semester.year}
            </strong>
            
        </div>
    );
};
