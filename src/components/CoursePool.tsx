/* eslint-disable no-extra-parens */
import React from "react";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";

interface CoursePool {
    coursePool: Course[];
    deletePool: (deleteCourse: Course) => void;
    AddCourseToDegreePlan: (course: Course) => void;
    IsRenderPoolTable: boolean;
}
const CoursePool = ({
    coursePool,
    deletePool,
    AddCourseToDegreePlan,
    IsRenderPoolTable
}: CoursePool) => {
    return (
        <div className="coursePool_box">
            <span className="Pool_Titile">{"Pool of Courses"}</span>
            {IsRenderPoolTable && (
                <table>
                    <thead>
                        {" "}
                        <tr>
                            <th> Course Code</th>
                            <th> Course Credits</th>
                            <th> Delete</th>
                            <th> Add to Degree Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coursePool.map((course) => (
                            <tr key={course.code}>
                                {" "}
                                <td>{course.code}</td>
                                <td>{<div>{course.credits}</div>}</td>
                                <td>
                                    {" "}
                                    <Button
                                        variant="danger"
                                        onClick={() => deletePool(course)}
                                    >
                                        x
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            AddCourseToDegreePlan(course)
                                        }
                                    >
                                        Add
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default CoursePool;
