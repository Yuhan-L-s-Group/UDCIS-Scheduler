import { Button } from "react-bootstrap";
import courses from "../data/course.json";
import "./courseTable.css";
import EditCourse from "./EditCourse";
import React, { useState } from "react";
import { AddtoSemester } from "./AddtoSemester";
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
    ModifiedCourseList: Course[];
}

const CoursesTable = ({
    onClose,
    listCourses,
    setListCourses,
    ModifiedCourseList
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
    const [selectedCourse, setselectedCourse] = useState<Course>({
        code: "",
        name: "",
        description: "",
        credits: 0,
        preReq: [],
        coreReq: []
    });
    const [isAddSemesterOpen, SetAddSemester] = useState(false);
    const openEditCourse = () => {
        setEditCourseOpen(true);
    };
    const closeEditCourse = () => {
        setEditCourseOpen(false);
    };
    const gotYouCourse = (course: Course) => {
        setselectedCourse(course);
        setEditCourseOpen(true);
    };
    const gotYouCourse2 = (course: Course) => {
        setselectedCourse(course);
        SetAddSemester(true);
    };
    const openAddSemester = () => {
        SetAddSemester(true);
    };
    const closeAddSemester = () => {
        SetAddSemester(false);
    };

    return (
        <div>
            <h1 style={{ textAlign: "left" }}>CoursesList</h1>
            {Object.entries(categorizedCourses).map(([prefix, listCourses]) => (
                <div key={prefix} className="tableBetween">
                    <table className="Tablesize">
                        <thead>
                            <tr>
                                <th>Code: {prefix}</th>
                                <th>Name</th>
                                <th>Edit Course</th>
                                <th>Add it to Semester</th>
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
                                            onClick={() => gotYouCourse(course)}
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
                                                    CourseSlected={
                                                        selectedCourse
                                                    }
                                                    ModifiedCourseList={
                                                        ModifiedCourseList
                                                    }
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td className="adjustrow">
                                        <Button
                                            onClick={() =>
                                                gotYouCourse2(course)
                                            }
                                            variant="success"
                                        >
                                            Add to Semester
                                        </Button>
                                        {isAddSemesterOpen && (
                                            <div>
                                                <AddtoSemester
                                                    selectedCourse={
                                                        selectedCourse
                                                    }
                                                    closeAddSemester={
                                                        closeAddSemester
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
