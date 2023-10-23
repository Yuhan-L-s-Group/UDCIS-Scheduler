import React, { useState, useEffect } from "react";
import "./App.css";

interface Course {
    code: string;
    name: string;
    description: string;
    credits: number;
    preReq: string[];
    coreReq: string[];
}

interface CourseProps {
    course: Course;
}

const CourseComponent: React.FC<CourseProps> = ({ course }) => {
    return (
        <div className="App-header">
            <h3>
                {course.code}: {course.name}
            </h3>
            <p>{course.description}</p>
            <p>Credits: {course.credits}</p>
            <p>Prerequisites: {course.preReq.join(", ")}</p>
            <p>Corequisites: {course.coreReq.join(", ")}</p>
        </div>
    );
};

const CourseList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetch("/path/to/course.json")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Courses</h1>
            </header>
            <div className="course-list">
                {courses.map((course) => (
                    <CourseComponent key={course.code} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
