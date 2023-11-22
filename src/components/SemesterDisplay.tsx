/* eslint-disable no-extra-parens */
import React from "react";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import "../App.css";
// Display each individual semester
// Addtionally it automatically caculates the each semester credits

interface SemesterDisplayProps {
    semester: Semester;
    modifysemster: (semester: Semester[]) => void;
    semesters: Semester[];
    handleCourseMove: (course: Course, targetSemesterId: string) => void; // 添加这行
}

export const SemesterDisplay = ({
    semester,
    modifysemster,
    semesters,
    handleCourseMove
}: {
    semester: Semester;
    modifysemster: (semester: Semester[]) => void;
    semesters: Semester[];
    handleCourseMove: (course: Course, targetSemesterId: string) => void;
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
    // const handleSwicthCourse
    return (
        <div className="semester_view">
            <table>
                <thead>
                    <tr>
                        <th>
                            Semester: {semester.season} {semester.year}
                        </th>
                        <th>
                            Total:{" "}
                            {semester.courses.reduce(
                                (acc, iter) => acc + parseInt(iter.credits, 10),
                                0
                            )}
                        </th>
                        <th>Switch Course</th>
                        {semester.courses.length !== 0 && (
                            <th>
                                <button
                                    className="emeptySemester"
                                    onClick={() => EmptySemester(semester)}
                                >
                                    Empty
                                </button>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {semester.courses.map((course) => (
                        <tr key={course.code + course.name}>
                            <td>
                                {course.code} - {course.name}
                            </td>
                            <td>{course.credits}</td>
                            <td>
                                <select
                                    onChange={(e) =>
                                        handleCourseMove(course, e.target.value)
                                    }
                                >
                                    <option value="">Move to...</option>
                                    {semesters.map((s) => (
                                        <option
                                            key={s.season + s.year}
                                            value={s.season + s.year}
                                        >
                                            {s.season} {s.year}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteCourseFunc(course)}
                                >
                                    x
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {semester.courses.length > 0 && (
                        <tr>
                            <td colSpan={4}>
                                <button
                                    onClick={() =>
                                        deleteWholeSemester(semester)
                                    }
                                    className="deleteEntireSemesterView"
                                >
                                    Delete Entire Semester
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
