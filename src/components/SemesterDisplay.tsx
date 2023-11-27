/* eslint-disable no-extra-parens */
import React from "react";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import "../App.css";
import { Season, Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

// Display each individual semester
// Addtionally it automatically caculates the each semester credits
export const SemesterDisplay = ({
    semester,
    modifysemster,
    semesters,
    degreeList,
    setDegreeList,
    selectedDegreePlan
}: {
    semester: Semester;
    modifysemster: (semester: Semester[]) => void;
    semesters: Semester[];
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    selectedDegreePlan: DegreePlan;
}): JSX.Element => {
    const deleteCourseFunc = (course: Course) => {
        // const indexC = semester.courses.findIndex(
        //     (target) => target === course
        // );
        // semester.courses.splice(indexC, 1);
        // const update = [...semesters];
        // modifysemster(update);

        const findDegreeIndex = degreeList.findIndex(
            (degreeplan) => degreeplan === selectedDegreePlan
        );
        const findSemesterIndex = selectedDegreePlan.semesters.findIndex(
            (s) => s === semester
        );
        const findCourseIndex = selectedDegreePlan.semesters[
            findSemesterIndex
        ].courses.findIndex((c) => c === course);
        degreeList[findDegreeIndex].semesters[findSemesterIndex].courses.splice(
            findCourseIndex,
            1
        );
        const update2 = [...degreeList];
        setDegreeList(update2);
        console.log(selectedDegreePlan);
    };

    const deleteWholeSemester = () => {
        // const indexS = semesters.findIndex((target) => target === semester);
        // semesters.splice(indexS, 1);
        // const update = [...semesters];
        // modifysemster(update);
        // const findDegreeIndex = degreeList.findIndex(
        //     (degreeplan) => degreeplan === selectedDegreePlan
        // );
        // const findSemesterIndex = selectedDegreePlan.semesters.findIndex(
        //     (s) => s === semester
        // );
        // degreeList[findDegreeIndex].semesters.splice(findSemesterIndex, 1);
        // const update2 = [...degreeList];
        console.log(selectedDegreePlan);
        // setDegreeList(update2);
    };
    const EmptySemester = (semester: Semester) => {
        semester.courses.splice(0, semester.courses.length);
        const update = [...semesters];
        modifysemster(update);
        console.log(selectedDegreePlan);
    };
    // const handleSwicthCourse
    return (
        <div className="semester_view">
            <table>
                <thead>
                    <tr>
                        <th>
                            Semster: {semester.season} {semester.year}
                        </th>
                        <th>
                            Total:{" "}
                            {semester.courses.reduce(
                                (acc, iter) => acc + parseInt(iter.credits),
                                0
                            )}
                        </th>
                        <th>Switch Course</th>
                        {semester.courses.length !== 0 && (
                            <th>
                                {" "}
                                {/* <button
                                    className="emeptySemester"
                                    onClick={() => EmptySemester(semester)}
                                >
                                    Empty
                                </button> */}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {semester.courses.map((course) => (
                        <tr key={course.code + course.name}>
                            <td>
                                {course.code}
                                {" - "}
                                {course.name}
                            </td>
                            <td> {course.credits}</td>
                            <td>
                                {/* <button
                                // onClick={() => handleSwicthCourse(course)}
                                >
                                    Switch
                                </button> */}
                            </td>
                            <td>
                                {" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteCourseFunc(course)}
                                >
                                    x
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {
                        <tr>
                            <td colSpan={4}>
                                {/* <button
                                    onClick={() => deleteWholeSemester()}
                                    className="deleteEntireSemesterView"
                                >
                                    {" "}
                                    Delete Entire Semester
                                </button> */}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
