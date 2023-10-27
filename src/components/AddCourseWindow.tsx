import React, { useState } from "react";
import { Course } from "../interfaces/course";
import Courses from "../data/course.json";
export function AddCourseWindow({ onClose }: { onClose: () => void }) {
    const listCourses = Courses.map((Course) => ({ ...Course }));
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
        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleConfirm = () => {
        console.log(course);
        console.log(listCourses.map((course) => ({ ...course })));
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
