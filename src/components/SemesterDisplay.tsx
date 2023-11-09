import React, { useState } from "react";
import { Season, Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import "../App.css";
export const SemesterDisplay = ({
    semester,
    deleteSemester,
    deleteCourse,
    semesters
}: {
    semester: Semester;
    deleteSemester: (season: Season, year: number) => void;
    deleteCourse: (semester: Semester[]) => void;
    semesters: Semester[];
}): JSX.Element => {
    const [isAddcourseOpen, setIsAddcourseOpen] = useState<boolean>(false);
    const [todelete, setdelete] = useState<Course>();
    const OpenAddCourse = () => {
        setIsAddcourseOpen(true);
    };
    const closeAddCourse = () => {
        setIsAddcourseOpen(false);
    };
    const deleteCourseFunc = (course: Course) => {
        const indexC = semester.courses.findIndex(
            (target) => target === course
        );
        semester.courses.splice(indexC, 1);
        const update = [...semesters];
        deleteCourse(update);
    };

    // const deleteSingleSemester = (semester: Semester | null) => {
    //     semester = null;
    //     const update = [...semesters];
    //     deleteCourse(update);
    //     console.log(semesters);
    // };
    const deleteSingleSemester = (semester: Semester | null) => {
        const indexS = semesters.findIndex((target) => target === semester);
        semesters.splice(indexS, 1);
        const update = [...semesters];
        deleteCourse(update);
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
                    X
                </Button>
            </h3>

            {/* <Button
                variant="danger"
                onClick={() => deleteSemester(semester.season, semester.year)}
            >
                X
            </Button> */}

            <div>
                {semester.courses.length === 0 ? (
                    <span>Empty!</span>
                ) : (
                    <span className="courseSize">
                        {semester.courses.map((course) => (
                            <span key={course.code + course.name}>
                                {course.code + " - "}
                                {course.name + " - "}
                                {course.credits + " credits"}{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteCourseFunc(course)}
                                >
                                    delete
                                </Button>
                                <br />
                            </span>
                        ))}
                    </span>
                )}
            </div>
        </div>
    );
};
