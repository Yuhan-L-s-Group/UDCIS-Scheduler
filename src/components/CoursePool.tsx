/* eslint-disable no-extra-parens */
// because eslint conflict with prettier
import React from "react";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";

interface CoursePool {
    coursePool: Course[];
    deletePool: (deleteCourse: Course) => void;
    AddCourseToDegreePlan: (course: Course) => void;
    IsRenderPoolTable: boolean;
    setIsRenderPoolTable: React.Dispatch<React.SetStateAction<boolean>>;
    DragCouse: Course;
    setDragCouse: React.Dispatch<React.SetStateAction<Course>>;
    setCoursePool: React.Dispatch<React.SetStateAction<Course[]>>;
}
const CoursePool = ({
    coursePool,
    deletePool,
    AddCourseToDegreePlan,
    IsRenderPoolTable,
    setIsRenderPoolTable,
    DragCouse,
    setDragCouse,
    setCoursePool
}: CoursePool) => {
    const handledrag = (
        course: Course,
        event: React.DragEvent<HTMLTableRowElement>
    ) => {
        event.preventDefault();
    };
    const handledrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const repeatedCourse = coursePool.filter((c) => c === DragCouse);
        if (repeatedCourse.length <= 0) {
            coursePool.push(DragCouse);
            const update = [...coursePool];
            setCoursePool(update);
        }
        setIsRenderPoolTable(true);
    };
    const handledragover = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    return (
        <div
            className="coursePool_box"
            onDrop={(event) => handledrop(event)}
            onDragOver={(e) => handledragover(e)}
        >
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
                            <tr
                                key={course.code}
                                draggable={true}
                                onDrag={(e) => handledrag(course, e)}
                                onDragStart={() => setDragCouse(course)}
                                style={{
                                    backgroundColor: "lightblue",
                                    color: "black"
                                }}
                            >
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
