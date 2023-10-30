import React from "react";

interface Course {
    code: string;
    name: string;
}

const courses: Course[] = [
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC181",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC210",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC220",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    },
    {
        code: "CISC108",
        name: "Introduction to Computer Science I"
    }
];

const Courses: React.FC = () => {
    return (
        <div>
            <h1>Course List</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.code}>
                        {course.code}: {course.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
