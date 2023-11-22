import EditCourse from "./EditCourse";
import React, { useState } from "react";
import { AddtoSemester } from "./AddtoSemester";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { Button, Modal, Form } from "react-bootstrap";

export const PoolList = ({ pool }: { pool: Course[] }) => {
    //a fake button for now
    function chooseSemester() {
        console.log(pool);
    }

    return (
        <div>
            {pool.map((course: Course) => (
                <div key={course.code + course.name}>
                    {course.code} - {course.name} {"        "}
                    {course.credits}
                    <Button onClick={() => chooseSemester}>Add to</Button>
                </div>
            ))}
        </div>
    );
};
