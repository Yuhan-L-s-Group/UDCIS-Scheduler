import React, { useState } from "react";
import { AddCourseWindow } from "./AddCourseWindow";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
// import ".modal.css";

export function TwoWindows() {
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [listCourses, setlistCourses] = useState<Course[]>(Courses);

    const openAddCourseWindow = () => {
        setAddCourseOpen(true);
    };

    const closeAddCourseWindow = () => {
        setAddCourseOpen(false);
    };

    return (
        <div>
            <button onClick={openAddCourseWindow}>Modify Courses</button>

            {isAddCourseOpen && (
                <div>
                    <AddCourseWindow
                        onClose={closeAddCourseWindow}
                        listCourses={listCourses}
                        setListCourses={setlistCourses}
                    />
                </div>
            )}
            {/* Other editing content */}
        </div>
    );
}
