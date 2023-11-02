import React, { useState } from "react";
import { AddCourse } from "./AddCourse";
import EditCourse from "./EditCourse";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
import Button from "react-bootstrap/Button";
import CoursesTable from "./courseTable";
import "./courseTable.css";

export function TwoModals() {
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [listCourses, setListCourses] = useState<Course[]>(Courses);
    const tempOriginCourseList = listCourses;
    const OriginalCourseList = listCourses;
    const openAddCourseWindow = () => {
        setAddCourseOpen(true);
    };

    const closeAddCourseWindow = () => {
        setAddCourseOpen(false);
    };

    return (
        <div>
            <div className="AdjustTitle">Add course to CourseList:</div>
            <Button variant="primary" onClick={openAddCourseWindow}>
                Add Course
            </Button>
            <CoursesTable
                OriginalCourseList={OriginalCourseList}
                onClose={closeAddCourseWindow}
                listCourses={listCourses}
                setListCourses={setListCourses}
            />
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
