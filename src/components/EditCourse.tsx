import React, { useState } from "react";
import { Course } from "../interfaces/course";

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
    return <div></div>;
}
