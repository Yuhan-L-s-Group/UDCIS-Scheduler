/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { AddCourse } from "./AddCourse";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
import Button from "react-bootstrap/Button";
import CoursesTable from "./courseTable";
import "./courseTable.css";
import { Semester } from "../interfaces/semester";
interface SemesterProps {
    semesters: Semester[];
    setSemester: React.Dispatch<React.SetStateAction<Semester[]>>;
}
export function TwoModals({ semesters, setSemester }: SemesterProps) {
    return <div></div>;
}
