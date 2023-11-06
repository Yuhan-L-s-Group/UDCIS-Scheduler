import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SemesterDisplay } from "./SemesterDisplay";
import { Season, Semester } from "../interfaces/semester";
import "../App.css";

export const SemesterList = ({
    semesters,
    deleteSemester
}: {
    semesters: Semester[];
    deleteSemester: (season: Season, year: number) => void;
}) => {
    return (
        <>
            <div className="modifytheCreditsText">
                {"Cumulative credits: "}
                {semesters.reduce(
                    (acc, iter) =>
                        acc +
                        iter.courses.reduce(
                            (acc1, iter1) => acc1 + iter1.credits,
                            0
                        ),
                    0
                )}
                {" credits"}
            </div>
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
        </>
    );
};
