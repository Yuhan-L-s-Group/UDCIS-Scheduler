import { Button } from "react-bootstrap";
import courses from "../data/course.json";
import "./courseTable.css";
import EditCourse from "./EditCourse";
import React, { useState } from "react";

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
    const [isEditCourseOpen, setEditCourseOpen] = useState(false);
    const openEditCourse = () => {
        setEditCourseOpen(true);
    };
    const closeEditCourse = () => {
        setEditCourseOpen(false);
    };

    return (
        <div>
            <h1 style={{ textAlign: "left" }}>CoursesList</h1>
            {Object.entries(categorizedCourses).map(([prefix, listCourses]) => (
                <div key={prefix} className="tableBetween">
                    {/* <h2 className="invisableText"> {"   Got U   "}</h2> */}
                    <table className="Tablesize">
                        <thead>
                            <tr>
                                <th>Code: {prefix}</th>
                                <th>Name</th>
                                <th>Edit Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCourses.map((course: Course) => (
                                <tr key={course.code}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={openEditCourse}
                                        >
                                            Edit
                                        </Button>
                                        {isEditCourseOpen && (
                                            <div>
                                                <EditCourse
                                                    listCourses={listCourses}
                                                    setListCourses={
                                                        setListCourses
                                                    }
                                                    closeEditCourse={
                                                        closeEditCourse
                                                    }
                                                />
                                            </div>
                                        )}
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
