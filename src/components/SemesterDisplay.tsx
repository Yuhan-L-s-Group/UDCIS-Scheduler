import React from "react";
import { Season, Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";

export const SemesterDisplay = ({
    semester,
    deleteSemester
}: {
    semester: Semester;
    deleteSemester: (season: Season, year: number) => void;
}): JSX.Element => {
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
                    <span>Not Empty!</span>
                )}
            </div>
        </div>
    );
};
