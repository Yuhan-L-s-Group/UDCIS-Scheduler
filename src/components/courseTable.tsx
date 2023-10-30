import React from "react";
import courses from "../data/course.json";
import "./courseTable.css";

interface Course {
    code: string;
    name: string;
    description: string;
    credits: number;
    preReq: string[];
    coreReq: string[];
}

const CoursesTable: React.FC = () => {
    const categorizedCourses = courses.reduce((acc, course) => {
        const prefix = course.code.substring(0, 4);
        if (!acc[prefix]) {
            acc[prefix] = [];
        }
        acc[prefix].push(course);
        return acc;
    }, {} as Record<string, Course[]>);

    return (
        <div>
            <h1>CoursesList</h1>
            {Object.entries(categorizedCourses).map(([prefix, courses]) => (
                <div key={prefix}>
                    <h2>{prefix}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course: Course) => (
                                <tr key={course.code}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default CoursesTable;
