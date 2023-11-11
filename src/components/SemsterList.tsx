import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SemesterDisplay } from "./SemesterDisplay";
import { Season, Semester } from "../interfaces/semester";
import "../App.css";
import horse from "../pictures/horse.jpg";
export const SemesterList = ({
    semesters,
    deleteSemester,
    Name,
    renderName,
    modifysemster
}: {
    semesters: Semester[];
    deleteSemester: (season: Season, year: number) => void;
    Name: string;
    renderName: boolean;
    modifysemster: (semester: Semester[]) => void;
}) => {
    return (
        <>
            <br />
            <br />
            {renderName && <div className="name"> Hi! {Name}</div>}
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
                {" credits"} {renderName && <img src={horse} alt="horse" />}
            </div>
            <div className="semester_list">
                {semesters.map(
                    (semester: Semester): JSX.Element => (
                        <div key={semester.year + semester.season}>
                            <SemesterDisplay
                                semester={semester}
                                deleteSemester={deleteSemester}
                                modifysemster={modifysemster}
                                semesters={semesters}
                            ></SemesterDisplay>
                        </div>
                    )
                )}
            </div>
        </>
    );
};
