import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { SemesterDisplay } from "./SemesterDisplay";
import { Button } from "react-bootstrap";

interface MovableCourse {
    semesters: Semester[];
}

const MovableCourses = ({ semesters }: MovableCourse) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const handleCourseSelection = (course: Course) => {
        setSelectedCourse(course);
    };
};
