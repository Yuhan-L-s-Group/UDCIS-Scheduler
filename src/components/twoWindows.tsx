import React, { useState } from "react";
import { AddCourseWindow } from "./AddCourseWindow";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
import "./modal.css"; // Import the CSS file

export function TwoWindows() {
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
            <button onClick={openAddCourseWindow}>Add Course</button>

            {isAddCourseOpen && (
                <div className="modal-container">
                    <AddCourseWindow
                        onClose={closeAddCourseWindow}
                        listCourses={listCourses}
                        setListCourses={setListCourses}
                    />
                </div>
            )}
            {/* Other editing content */}
        </div>
    );
}
