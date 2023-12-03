/* eslint-disable no-extra-parens */
import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreePlan";
import all from "../RequiredCourses/FitsAll.json";
import { Requirement } from "../../interfaces/Requirement";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";

export const Common = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    const allCourses = degreePlan.semesters.flatMap((semester) =>
        semester.courses.map((course) => course.code)
    );

    function compare(array1: string[], array2: string[]): boolean {
        return array1.some((element) => array2.includes(element));
    }
    function findSame(array1: string[], array2: string[]): string[] {
        return array1.filter((element) => array2.includes(element));
    }

    const FYS = all.find(
        (type: Requirement): boolean => type.name === "First Year Seminar"
    );

    //✔️❌
    return (
        <div>
            <br></br>
            {allCourses.includes("ENGL110") ? (
                <div>
                    <h4>Seminar in Composition✔️</h4>
                    <span style={{ color: "green" }}>ENGL110</span>
                </div>
            ) : (
                <div>
                    <h4>Seminar in Composition❌</h4>
                    <span style={{ color: "red" }}>ENGL110</span>
                </div>
            )}
            <br></br>
            {FYS && compare(allCourses, FYS.courses) ? (
                <div>
                    <h3>First Year Seminar✔️</h3>
                    <span style={{ color: "green" }}>
                        {findSame(allCourses, FYS.courses)}
                    </span>
                </div>
            ) : (
                <div>
                    <h3>First Year Seminar❌</h3>
                    <span style={{ color: "red" }}>
                        0/1:{" "}
                        {FYS?.courses.map(
                            (course: string): string => course + " "
                        )}
                    </span>
                </div>
            )}
        </div>
    );
};
