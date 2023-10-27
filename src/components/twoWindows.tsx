import React, { useState } from "react";
import { AddCourseWindow } from "./AddCourseWindow";
// import ".modal.css";

export function TwoWindows() {
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);

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
                    <AddCourseWindow onClose={closeAddCourseWindow} />
                </div>
            )}
            {/* Other editing content */}
        </div>
    );
}
