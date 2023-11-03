import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SemesterDisplay } from "./SemesterDisplay";
import { Season, Semester } from "../interfaces/semester";

export const SemesterList = ({
    semesters,
    deleteSemester
}: {
    semesters: Semester[];
    deleteSemester: (season: Season, year: number) => void;
}) => {
    return (
        <div className="semester_list">
            {semesters.map(
                (semester: Semester): JSX.Element => (
                    <SemesterDisplay
                        key={semester.year + semester.season}
                        semester={semester}
                        deleteSemester={deleteSemester}
                    ></SemesterDisplay>
                )
            )}
        </div>
    );
};
