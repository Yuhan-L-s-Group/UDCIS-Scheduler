import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreePlan";
import all from "../RequiredCourses/FitsAll.json";
import { Course } from "../../interfaces/course";

export const Common = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    //TEST
    const allCourses = degreePlan.semesters.flatMap((semester) =>
        semester.courses.map((course) => course)
    );

    function findSameCourse(array1: Course[], array2: string[]): Course[] {
        let outPut = [];
        outPut = array2
            .map((code) => array1.find((course) => course.code === code))
            .filter((course) => course !== undefined);
        return outPut as Course[];
    }

    let HTMLoutPut = "";
    all.forEach((require) => {
        const result = findSameCourse(allCourses, require.courses);
        if (require.type === "courses") {
            if (result.length === require.number) {
                HTMLoutPut += "<h4>{require.name}✔️</h4>";
                HTMLoutPut += `<span style={{ color: "green" }}><strong>${result.length}/${require.number}: </strong></span>`;
            } else {
                HTMLoutPut += `<h4>${require.name}❌</h4>`;
                HTMLoutPut += `<span style={{ color: "red" }}><strong>${result.length}/${require.number}: </strong></span>`;
            }
        } else {
            //if that require is about credit
            const totalCredits: number = result.reduce(
                (acc, course) => acc + parseInt(course.credits),
                0
            );
            if (totalCredits >= require.number) {
                HTMLoutPut += `<h4>${require.name}✔️</h4>`;
                HTMLoutPut += `<span style={{ color: "green" }}><strong>${totalCredits}/${require.number}: </strong></span>`;
            } else {
                HTMLoutPut += `<h4>${require.name}❌</h4>`;
                HTMLoutPut += `<span style={{ color: "red" }}><strong>${totalCredits}/${require.number}: </strong></span>`;
            }
        }
    });

    //✔️❌
    return (
        <div>
            {HTMLoutPut}
            <Button onClick={print}>Print</Button>
        </div>
    );
};
