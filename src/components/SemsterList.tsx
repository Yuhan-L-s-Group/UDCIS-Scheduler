/* eslint-disable no-extra-parens */

import { SemesterDisplay } from "./SemesterDisplay";
import { Semester } from "../interfaces/semester";
import "../App.css";
import horse from "../pictures/horse.jpg";
import React from "react";
import { Course } from "../interfaces/course";
// It contains all the semesters into "semesters" varible and iterate each semester into "SemesterDisplay" component
// Addtionally it automatically caculates the cumulative credits
export const SemesterList = ({
    semesters,
    Name,
    renderName,
    modifysemster,
    isDisplayEmpty,
    clearSemester
}: {
    semesters: Semester[];
    Name: string;
    renderName: boolean;
    modifysemster: (semester: Semester[]) => void;
    isDisplayEmpty: boolean;
    clearSemester: () => void;
}) => {
    const handleCourseMove = (course: Course, targetSemesterId: string) => {
        const updatedSemesters = semesters.map((semester) => {
            if (semester.season + semester.year === targetSemesterId) {
                return {
                    ...semester,
                    courses: [...semester.courses, course]
                };
            } else if (semester.courses.find((c) => c.code === course.code)) {
                return {
                    ...semester,
                    courses: semester.courses.filter(
                        (c) => c.code !== course.code
                    )
                };
            }
            return semester;
        });

        modifysemster(updatedSemesters);
    };
    return (
        <>
            <br />
            <br />
            {renderName && <div className="name"> Hi! {Name}</div>}
            <div className="modifytheCreditsText">
                {"Your Cumulative credits: "}
                {semesters.reduce(
                    (acc, iter) =>
                        acc +
                        iter.courses.reduce(
                            (acc1, iter1) => acc1 + parseInt(iter1.credits),
                            0
                        ),
                    0
                )}
                {" credits"} {renderName && <img src={horse} alt="horse" />}
            </div>
            {isDisplayEmpty && (
                <div>
                    <div className="semester_box">
                        <div className="semesterListName-view"> </div>
                        {semesters.map(
                            (semester: Semester): JSX.Element => (
                                <div key={semester.year + semester.season}>
                                    <SemesterDisplay
                                        semester={semester}
                                        modifysemster={modifysemster}
                                        semesters={semesters}
                                        handleCourseMove={handleCourseMove}
                                    />
                                </div>
                            )
                        )}
                        {isDisplayEmpty && (
                            <button
                                className="clear_button"
                                onClick={clearSemester}
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
