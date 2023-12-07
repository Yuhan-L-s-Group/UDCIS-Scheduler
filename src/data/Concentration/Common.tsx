import React from "react";
import { DegreePlan } from "../../interfaces/degreePlan";
import all from "../RequiredCourses/FitsAll.json";
import { Course } from "../../interfaces/course";
import BA from "../RequiredCourses/BA.json";
import BS from "../RequiredCourses/BS.json";
import AI from "../RequiredCourses/AI.json";
import Bio from "../RequiredCourses/Bio.json";
import Cyber from "../RequiredCourses/Cyber.json";
import Data from "../RequiredCourses/Data.json";
import Math from "../RequiredCourses/High1.json";
import HighData from "../RequiredCourses/High2.json";
import System from "../RequiredCourses/Systems.json";
import Discrete from "../RequiredCourses/Theory1.json";
import Continuous from "../RequiredCourses/Theory2.json";
import { Requirement } from "../../interfaces/Requirement";

export function getURLs(conc: string): Requirement[] {
    const URLS: Record<string, Requirement[]> = {
        "Bachelor of Arts": BA,
        "Bachelor of Science": BS,
        "Artificial Intelligence and Robotics": AI,
        Bioinformatics: Bio,
        Cybersecurity: Cyber,
        "Data Science": Data,
        "High Performance Computing (Applied Math Track)": Math,
        "High Performance Computing (Data Track)": HighData,
        "Systems and Networks": System,
        "Theory and Computation (Discrete Track)": Discrete,
        "Theory and Computation (Continuous Track)": Continuous
    };
    return URLS[conc];
}

export const Common = ({
    degreePlan
}: //show,
//handleClose
{
    degreePlan: DegreePlan;
    //show: boolean;
    //handleClose: () => void;
}) => {
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

    const CommonOutput = all.map((require) => {
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
    return <div>{CommonOutput}</div>;
};
