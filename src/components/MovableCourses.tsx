import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { SemesterDisplay } from "./SemesterDisplay";
import { Button } from "react-bootstrap";

interface MovableCourse {
    semesters: Semester[];
}

const MovableCourses = ({ semesters }: MovableCourse) => {
    const [selectCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectSemester, setSelectedSemester] = useState<Semester | null>(
        null
    );

    const CourseSelection = (course: Course) => {
        setSelectedCourse(course);
    };

    const MoveCourse = (semester: Semester) => {
        if (selectCourse && selectSemester) {
            const updatedSemesters = semesters.map((sem) => {
                if (sem === selectSemester) {
                    const updatedCourses = sem.courses.filter(
                        (course) => course !== selectCourse
                    );
                    return { ...sem, courses: updatedCourses };
                }
                return sem;
            });

            const toChosenSemester = updatedSemesters.find(
                (sem) => sem === semester
            );
            if (toChosenSemester) {
                const updatedCourses = [
                    ...toChosenSemester.courses,
                    selectCourse
                ];
                const updatedSemester = {
                    ...toChosenSemester,
                    courses: updatedCourses
                };

                const updatedSemestersList = updatedSemesters.map((sem) =>
                    sem === updatedSemester ? updatedSemester : sem
                );
            }

            setSelectedCourse(null);
            setSelectedSemester(null);
        }
    };

    const ToDeleteCourse = (course: Course) => {
        if (selectSemester) {
            const updatedSemesters = semesters.map((semester) => {
                if (semester === selectSemester) {
                    const updatedCourses = semester.courses.filter(
                        (c) => c !== course
                    );
                    return { ...semester, courses: updatedCourses };
                }
                return semester;
            });

            setSelectedCourse(null);
            setSelectedSemester(null);
        }
    };

    return (
        <div>
            <h2>Move Courses</h2>
            <div>
                {semesters.map((semester) => (
                    <div key={semester.season + "-" + semester.year}>
                        <SemesterDisplay
                            semester={semester}
                            deleteSemester={() => ToDeleteCourse}
                            //                          onClick={CourseSelection}
                        />
                        <Button onClick={() => MoveCourse(semester)}>
                            Move Selected Course Here
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovableCourses;
