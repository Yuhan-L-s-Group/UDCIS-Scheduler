import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Season, Semester } from "../interfaces/semester";

interface AddCoursetoSemesterProp {
    ModifiedCourseList: Course[];
    semesters: Semester[];
    setSemester: (semesters: Semester[]) => void;
}
export function AddtoSemester({
    ModifiedCourseList,
    semesters,
    setSemester
}: AddCoursetoSemesterProp) {
    return <div></div>;
}
