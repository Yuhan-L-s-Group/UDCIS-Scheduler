import React from "react";
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

    const requirementsOutput = all.map((require) => {
        const result = findSameCourse(allCourses, require.courses);

        if (require.type === "courses") {
            const isFulfilled = result.length === require.number;
            return (
                <div key={require.name}>
                    <h4>
                        {require.name}
                        {isFulfilled ? "✔️" : "❌"}
                    </h4>
                    <span style={{ color: isFulfilled ? "green" : "red" }}>
                        <strong>
                            {result.length}/{require.number}:{" "}
                        </strong>
                    </span>
                </div>
            );
        } else {
            const totalCredits: number = result.reduce(
                (acc, course) => acc + parseInt(course.credits),
                0
            );
            const isFulfilled = totalCredits >= require.number;
            return (
                <div key={require.name}>
                    <h4>
                        {require.name}
                        {isFulfilled ? "✔️" : "❌"}
                    </h4>
                    <span style={{ color: isFulfilled ? "green" : "red" }}>
                        <strong>
                            {totalCredits}/{require.number}:{" "}
                        </strong>
                    </span>
                </div>
            );
        }
    });

    //✔️❌
    return <div>{requirementsOutput}</div>;
};
