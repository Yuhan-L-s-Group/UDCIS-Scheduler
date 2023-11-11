/* eslint-disable no-extra-parens */
import React from "react";
import { Season, Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import "../App.css";
export const SemesterDisplay = ({
    semester,
    deleteSemester,
    modifysemster,
    deleteCourse,
    semesters
}: {
    semester: Semester;
    deleteSemester: (season: Season, year: number) => void;
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


    const deleteSingleSemester = (semester: Semester) => {

    const deleteSingleSemester = (semester: Semester | null) => {

        const indexS = semesters.findIndex((target) => target === semester);
        semesters.splice(indexS, 1);
        const update = [...semesters];
        modifysemster(update);
    };
    const deleteWholeSemester = (semester: Semester) => {
        semester.courses.splice(0, semester.courses.length);
        const update = [...semesters];
        modifysemster(update);
        console.log(semester);
    };

    return (
        <div className="semester_view">
            <h3>
                {semester.season} {semester.year}
                {" - "}
                {semester.courses.reduce((acc, iter) => acc + iter.credits, 0)}
                {" credits "}{" "}
                <Button
                    variant="danger"
                    onClick={() => deleteSingleSemester(semester)}
                >
                    Delete Semester
                </Button>
            </h3>

            <div>
                {semester.courses.length === 0 ? (
                    <span>
                        This semester list is empty!
                        <br />
                    </span>
                ) : (
                    <span>
                        <span className="courseSize">
                            {semester.courses.map((course) => (
                                <span key={course.code + course.name}>
                                    {course.code + " - "}
                                    {course.name + " - "}
                                    {course.credits + " credits"}{" "}
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteCourseFunc(course)}
                                        className=""
                                    >
                                        delete
                                    </Button>
                                    <br />
                                </span>
                            ))}
                        </span>
                        <div>
                            <br />
                            <button
                                className="emeptySemester"
                                onClick={() => deleteWholeSemester(semester)}
                            >
                                Empty Semsester
                            </button>
                        </div>
                    </span>
                )}
            </div>
        </div>
    );
};
