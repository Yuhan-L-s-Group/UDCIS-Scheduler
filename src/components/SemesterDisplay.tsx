/* eslint-disable no-extra-parens */
import React from "react";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import "../App.css";
export const SemesterDisplay = ({
    semester,
    modifysemster,
    semesters
}: {
    semester: Semester;
    modifysemster: (semester: Semester[]) => void;
    semesters: Semester[];
}): JSX.Element => {
    const deleteCourseFunc = (course: Course) => {
        const indexC = semester.courses.findIndex(
            (target) => target === course
        );
        semester.courses.splice(indexC, 1);
        const update = [...semesters];
        modifysemster(update);
    };

    const deleteWholeSemester = (semester: Semester) => {
        const indexS = semesters.findIndex((target) => target === semester);
        semesters.splice(indexS, 1);
        const update = [...semesters];
        modifysemster(update);
    };
    const EmptySemester = (semester: Semester) => {
        semester.courses.splice(0, semester.courses.length);
        const update = [...semesters];
        modifysemster(update);
        console.log(semester);
    };

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
                                (acc, iter) => acc + iter.credits,
                                0
                            )}
                        </th>
                        <th>
                            {" "}
                            <button
                                className="emeptySemester"
                                onClick={() => EmptySemester(semester)}
                            >
                                Empty
                            </button>
                        </th>
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
                                {" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteCourseFunc(course)}
                                    className=""
                                >
                                    delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {
                        <tr>
                            <button
                                onClick={() => deleteWholeSemester(semester)}
                                className="deleteEntireSemesterView"
                            >
                                {" "}
                                Delete Entire Semester
                            </button>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
