import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
interface EditCourseProps {
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    closeEditCourse: () => void;
}
export default function EditCourse({
    listCourses,
    setListCourses,
    closeEditCourse
}: EditCourseProps) {
    const originalListCopy = listCourses;
    const [originalList, setListCoursesR] =
        useState<Course[]>(originalListCopy);
    return <div></div>;
}
// const handleConfirm = () => {

//     setListCourses(updated);
// };
