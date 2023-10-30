import React, { useState, useEffect } from "react";

const coursesData = [
    {
        code: "CS108",
        name: "Introduction to Computer Science I",
        description: "Basic concepts of computer science...",
        credits: 3,
        preReq: [],
        coreReq: []
    }
];

interface Course {
    code: string;
    name: string;
    description: string;
    credits: number;
    preReq: string[];
    coreReq: string[];
}

const CoursesByCategory: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        setCourses(coursesData);
    }, []);

    return (
        <div>
            <h1>Courses by Category</h1>
            {courses.map((course) => (
                <div key={course.code}>
                    <strong>{course.code}</strong>: {course.name}
                </div>
            ))}
        </div>
    );
};

export default CoursesByCategory;
