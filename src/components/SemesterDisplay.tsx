import React, { useState } from "react";
import { Season, Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import { AddtoSemester } from "./AddtoSemester";
import { TwoModals } from "./TwoModals";
export const SemesterDisplay = ({
    semester,
    deleteSemester
}: {
    semester: Semester;
    deleteSemester: (season: Season, year: number) => void;
}): JSX.Element => {
    const [isAddcourseOpen, setIsAddcourseOpen] = useState<boolean>(false);
    const OpenAddCourse = () => {
        setIsAddcourseOpen(true);
    };
    const closeAddCourse = () => {
        setIsAddcourseOpen(false);
    };
    return (
        <div className="semester_view">
            <h3>
                {semester.season} {semester.year}
            </h3>
            <Button
                variant="danger"
                onClick={() => deleteSemester(semester.season, semester.year)}
            >
                X
            </Button>

            <div>
                {semester.courses.length === 0 ? (
                    <span>Empty!</span>
                ) : (
                    <span>
                        {semester.courses.map((course) => (
                            <span key={course.code + course.name}>
                                {course.code + " "}
                                {course.name}
                                <br />
                            </span>
                        ))}
                    </span>
                )}
            </div>
        </div>
    );
};
