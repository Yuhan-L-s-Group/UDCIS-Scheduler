import React, { useState } from "react";
import { Course } from "../interfaces/course";

export function AddCourseWindow({ onClose }: { onClose: () => void }) {
    const [course, setCourse] = useState<Course>({
        code: "",
        name: "",
        description: "",
        credits: 0,
        preReq: [],
        coreReq: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "preReq" || name === "coreReq") {
            setCourse({
                ...course,
                [name]: value.split(",").map((item) => item.trim())
            });
        } else {
            setCourse({
                ...course,
                [name]: value
            });
        }
    };

    const handleConfirm = () => {
        console.log(course);

        // Close the window
        onClose();
    };

    return (
        <div>
            <h2>Add Course</h2>
            <label>
                Code:
                <input
                    type="text"
                    name="code"
                    value={course.code}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={course.name}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={course.description}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Credits:
                <input
                    type="number"
                    name="credits"
                    value={course.credits}
                    onChange={handleInputChange}
                />
            </label>

            <button onClick={handleConfirm}>Confirm</button>
        </div>
    );
}
