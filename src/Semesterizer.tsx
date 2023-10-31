import React, { useState } from "react";
import { semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";

import { AddsemesterModal } from "./AddsemesterModal";

import "./semesterizer.css";
import sample from "../data/semesters.json";

const SEMESTERS = sample.map(
    (semester): semester => ({
        ...semester,
        courseList: semester.courseList.map(
            (c): Course => ({
                ...c,
                submission: "",
                type: c.type as courseType
            })
        )
    })
);

export const Semesterizer = () => {
    const [semesters, setsemester] = useState<semester[]>(SEMESTERS);
    const [showAddModal, setShowAddModal] = useState(false);

    function editsemester(cCode: string, newSemester: semester) {
        setsemester(
            semesters.map(
                (c: semester): semester => (c.code === cCode ? newSemester : c)
            )
        );
    }

    function addsemester(title: string, body: string) {
        const newSemester: semester = {
            id: semesters.length + 1,
            title,
            body,
            published: false,
            courseList: []
        };
        setsemester([...semesters, newSemester]);
    }

    function deletesemester(cCode: string) {
        setsemester(
            semesters.filter((c: semester): boolean => cCode !== c.code)
        );
    }

    const handleShowModal = () => setShowAddModal(true);
    const handleCloseModal = () => setShowAddModal(false);

    return (
        <div className="semesterzer">
            <semesterList
                semesters={semesters}
                editsemester={editsemester}
                deletesemester={deletesemester}
                showModal={handleShowModal}
            ></semesterList>
            <AddsemesterModal
                show={showAddModal}
                handleClose={handleCloseModal}
                addsemester={addsemester}
            ></AddsemesterModal>
            <hr />
            <h2 style={{ color: "white" }}>Application Sketch</h2>
            {/* <img src={recuire("./sketchFINAL.jpg")} /> */}
            <hr />
            <div style={{ color: "white" }}>
                <h2>Completed Features</h2>
                <ul className="completedList">
                    <li>
                        {" "}
                        Users can see a list of semesters, including the
                        semesters semesters semesters semesters title, (TESTED)
                    </li>
                    <li>
                        Users can select a specific semester to see the
                        including the courses name, body, and points (TESTED)
                    </li>
                    <li>
                        semester courses can be of AT LEAST two types: a short
                        answer course or multiple choice course (TESTED)
                    </li>
                    <li>
                        Users can enter or choose an answer for a semester be
                        told if they are correct (TESTED)
                    </li>
                    <li>
                        Users can see how many total points they have earned
                        (TESTED)
                    </li>
                    <li>
                        Users can clear out their existing answers for a
                        (TESTED)
                    </li>
                    <li>Users can publish or unpublish a course (TESTED)</li>
                    <li>
                        Users can filter the courses in a list so that only
                        published courses are shown (TESTED)
                    </li>
                    <li>
                        Users can edit the courses and fields of a semester
                        (TESTED)
                    </li>
                    <li>Users can add a new semester course (TESTED)</li>
                    <li>
                        Users can delete an existing semester course (TESTED)
                    </li>
                    <li>Users can reorder semester courses (TESTED)</li>
                    <li>Users can add a new semester (TESTED)</li>
                    <li>Users can delete an existing semester (TESTED)</li>
                </ul>
            </div>
        </div>
    );
};
