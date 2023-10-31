import React, { useState } from "react";
import { AddCourse } from "./AddCourse";
import EditCourse from "./EditCourse";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
import Button from "react-bootstrap/Button";
import CoursesTable from "./courseTable";

export function TwoModals() {
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [listCourses, setListCourses] = useState<Course[]>(Courses);

    const openAddCourseWindow = () => {
        setAddCourseOpen(true);
    };

    const closeAddCourseWindow = () => {
        setAddCourseOpen(false);
    };

    return (
        <div>
            <CoursesTable
                onClose={closeAddCourseWindow}
                listCourses={listCourses}
                setListCourses={setListCourses}
            />
            <Button variant="primary" onClick={openAddCourseWindow}>
                Add Course
            </Button>
            {isAddCourseOpen && (
                <div>
                    <AddCourse
                        onClose={closeAddCourseWindow}
                        listCourses={listCourses}
                        setListCourses={setListCourses}
                    />
                </div>
            )}
        </div>
    );
}
