import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";
import { AddSemesterModal } from "./SemesterModal";
import { SemesterList } from "./SemsterList";

//import "./css";

export const DegreePlanDetail = ({
    //degreePlan
}: {
    //degreePlan: DegreePlan[];
}) => {
    const [showAddSemester, setAddSemester] = useState(false);
    const [semesters, setSemester] = useState<Semester[]>([]);
    const [isDisplayEmpty, setDisplayEmpty] = useState(false);
    const handleShowModal = () => {
        setAddSemester(true);
        setDisplayEmpty(true);
    };
    const handleCloseModal = () => setAddSemester(false);

    function clearSemester() {
        setSemester([]);
        setDisplayEmpty(false);
    }

    function modifysemster(semester: Semester[]) {
        setSemester(semester);
    }

    function addNewSemester(year: number, season: Season) {
        setSemester([
            ...semesters,
            {
                season: season,
                year: year,
                courses: []
            }
        ]);
    }

    return (
        <div>
            <Button className="add_button" onClick={handleShowModal}>
                Add New Semester
            </Button>
            <SemesterList
                semesters={semesters}
                modifysemster={modifysemster}
                isDisplayEmpty={isDisplayEmpty}
                clearSemester={clearSemester}
            ></SemesterList>
            <br />
            <br />
            <AddSemesterModal
                showAddSemester={showAddSemester}
                handleClose={handleCloseModal}
                addSemester={addNewSemester}
                semesters={semesters}
            ></AddSemesterModal>
            ;
        </div>
    );
};
