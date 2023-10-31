import React from "react";
import courses from "../data/course.json";
import "./courseTable.css";
import EditCourse from "./EditCourse";
interface Course {
    code: string;
    name: string;
    description: string;
    credits: number;
    preReq: string[];
    coreReq: string[];
}
interface EditCourseProps {
    onClose: () => void;
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
}

const CoursesTable = ({
    onClose,
    listCourses,
    setListCourses
}: EditCourseProps) => {
    const categorizedCourses = listCourses.reduce((acc, course) => {
        const prefix = course.code.substring(0, 4);
        if (!acc[prefix]) {
            acc[prefix] = [];
        }
        acc[prefix].push(course);
        return acc;
    }, {} as Record<string, Course[]>);

    return (
        <div>
            <h1 style={{ textAlign: "left" }}>CoursesList</h1>
            {Object.entries(categorizedCourses).map(([prefix, listCourses]) => (
                <div key={prefix}>
                    <h2 style={{ textAlign: "left" }}>{prefix}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>col</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCourses.map((course: Course) => (
                                <tr key={course.code}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                    <td>
                                        <button onClick={EditCourse}>
                                            Edit Course
                                        </button>
                                    </td>
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
