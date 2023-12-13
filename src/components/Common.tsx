/* eslint-disable no-extra-parens */
// eslint conflict with prettier
import React from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import all from "../data/RequiredCourses/FitsAll.json";
import { Course } from "../interfaces/course";
import BA from "../data/RequiredCourses/BA.json";
import BS from "../data/RequiredCourses/BS.json";
import AI from "../data/RequiredCourses/AI.json";
import Bio from "../data/RequiredCourses/Bio.json";
import Cyber from "../data/RequiredCourses/Cyber.json";
import Data from "../data/RequiredCourses/Data.json";
import Math from "../data/RequiredCourses/High1.json";
import HighData from "../data/RequiredCourses/High2.json";
import System from "../data/RequiredCourses/Systems.json";
import Discrete from "../data/RequiredCourses/Theory1.json";
import Continuous from "../data/RequiredCourses/Theory2.json";
import { Requirement } from "../interfaces/Requirement";
import { Col, Container, Row } from "react-bootstrap";

export function getFiles(conc: string): Requirement[] {
    const file: Record<string, Requirement[]> = {
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
    return file[conc];
}

export const Common = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    const concList = getFiles(degreePlan.concentration);
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

    function findSameType(array1: Course[], courseDes: string): Course[] {
        let outPut = [];
        outPut = array1.filter((course) => course.breadth.includes(courseDes));

        return outPut as Course[];
    }

    function find300(array1: Course[]): Course[] {
        let outPut = [];
        outPut = array1.filter((course) => course.code.includes("CISC3"));

        return outPut as Course[];
    }

    const CommonOutput = all.map((require) => {
        if (degreePlan.concentration !== "Bachelor of Arts") {
            const result = findSameCourse(allCourses, require.courses);

            if (require.type === "breadth") {
                const breadthList = findSameType(allCourses, require.name);
                const totalCredits: number = breadthList.reduce(
                    (acc, course) => acc + parseInt(course.credits),
                    0
                );
                const isFulfilled = totalCredits >= require.number;
                return (
                    <div key={require.name}>
                        <h5>
                            {require.name}
                            {isFulfilled ? " ✔️" : " ❌"}
                        </h5>
                        <span style={{ color: isFulfilled ? "green" : "red" }}>
                            <strong>
                                {totalCredits}/{require.number}:{" "}
                            </strong>
                        </span>
                    </div>
                );
            }
            if (require.type === "CISC3") {
                const CISC300 = find300(allCourses);
                const totalCredits: number = CISC300.reduce(
                    (acc, course) => acc + parseInt(course.credits),
                    0
                );
                const isFulfilled = totalCredits >= require.number;
                return (
                    <div key={require.name}>
                        <h5>
                            {require.name}
                            {isFulfilled ? " ✔️" : " ❌"}
                        </h5>
                        <span style={{ color: isFulfilled ? "green" : "red" }}>
                            <strong>
                                {totalCredits}/{require.number}:{" "}
                            </strong>
                        </span>
                    </div>
                );
            }
            if (require.type === "courses") {
                const isFulfilled = result.length === require.number;
                return (
                    <div key={require.name}>
                        <h5>
                            {require.name}
                            {isFulfilled ? " ✔️" : " ❌"}
                        </h5>
                        <span style={{ color: isFulfilled ? "green" : "red" }}>
                            <strong>
                                {result.length}/{require.number} {require.type}{" "}
                                required
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
                        <h5>
                            {require.name}
                            {isFulfilled ? " ✔️" : " ❌"}
                        </h5>
                        <span style={{ color: isFulfilled ? "green" : "red" }}>
                            <strong>
                                {totalCredits}/{require.number} {require.type}{" "}
                                required{" "}
                            </strong>
                        </span>
                    </div>
                );
            }
        }
    });

    const ConcOutput = concList.map((require) => {
        const result = findSameCourse(allCourses, require.courses);

        if (require.type === "breadth") {
            const breadthList = findSameType(allCourses, require.name);
            const totalCredits: number = breadthList.reduce(
                (acc, course) => acc + parseInt(course.credits),
                0
            );
            const isFulfilled = totalCredits >= require.number;
            return (
                <div key={require.name}>
                    <h5>
                        {require.name}
                        {isFulfilled ? " ✔️" : " ❌"}
                    </h5>
                    <span style={{ color: isFulfilled ? "green" : "red" }}>
                        <strong>
                            {totalCredits}/{require.number}:{" "}
                        </strong>
                    </span>
                </div>
            );
        }
        if (require.type === "CISC3") {
            const CISC300 = find300(allCourses);
            const totalCredits: number = CISC300.reduce(
                (acc, course) => acc + parseInt(course.credits),
                0
            );
            const isFulfilled = totalCredits >= require.number;
            return (
                <div key={require.name}>
                    <h5>
                        {require.name}
                        {isFulfilled ? " ✔️" : " ❌"}
                    </h5>
                    <span style={{ color: isFulfilled ? "green" : "red" }}>
                        <strong>
                            {totalCredits}/{require.number}:{" "}
                        </strong>
                    </span>
                </div>
            );
        }
        if (require.type === "courses") {
            const isFulfilled = result.length === require.number;
            return (
                <div key={require.name}>
                    <h5>
                        {require.name}
                        {isFulfilled ? " ✔️" : " ❌"}
                    </h5>
                    <span style={{ color: isFulfilled ? "green" : "red" }}>
                        <strong>
                            {result.length}/{require.number} {require.type}{" "}
                            required
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
                    <h5>
                        {require.name}
                        {isFulfilled ? " ✔️" : " ❌"}
                    </h5>
                    <span style={{ color: isFulfilled ? "green" : "red" }}>
                        <strong>
                            {totalCredits}/{require.number} {require.type}{" "}
                            required{" "}
                        </strong>
                    </span>
                </div>
            );
        }
    });

    //✔️❌
    return (
        <div>
            <Container>
                <Row>
                    {degreePlan.concentration !== "Bachelor of Arts" ? (
                        <div>
                            <Col>
                                <h3>Common Requirements:</h3>
                                {CommonOutput}
                            </Col>
                            <Col>
                                <h3>Concentration Requirements:</h3>
                                {ConcOutput}
                            </Col>
                        </div>
                    ) : (
                        <Col>
                            <h3>Concentration Requirements:</h3>
                            {ConcOutput}
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};
