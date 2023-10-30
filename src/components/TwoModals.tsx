import React, { useState } from "react";
import { AddCourseWindow } from "./AddCourseWindow";
import { EditCrouseModal } from "./EditCrouseModal";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
import "./modal.css";
import Button from "react-bootstrap/Button";

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
            <Button variant="primary" onClick={openAddCourseWindow}>
                Add Course
            </Button>
            {isAddCourseOpen && (
                <div>
                    <AddCourseWindow
                        onClose={closeAddCourseWindow}
                        listCourses={listCourses}
                        setListCourses={setListCourses}
                    />
                </div>
            )}
            <div>
                <button onClick={EditCrouseModal}>Edit Course</button>
            </div>
        </div>
    );
}
