import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Semester, Season } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";
import { AddSemesterModal } from "./SemesterModal";
import { SemesterList } from "./SemsterList";

//import "./css";

export const DegreePlanDetail = ({
    degreePlan,
    resetView
}: {
    degreePlan: DegreePlan;
    resetView: () => void;
}) => {
    const [newDegreePlan, setNewPlan] = useState<DegreePlan>({ ...degreePlan });
    const [showAddSemester, setAddSemester] = useState(false);
    const [isDisplayEmpty, setDisplayEmpty] = useState(false);
    const handleShowModal = () => {
        setAddSemester(true);
        setDisplayEmpty(true);
    };
    const handleCloseModal = () => setAddSemester(false);

    function clearSemester() {
        setNewPlan({
            ...newDegreePlan,
            semesters: []
        });
        setDisplayEmpty(false);
    }

    function modifysemster(semester: Semester[]) {
        //setSemester(semester);
    }

    function addNewSemester(year: number, season: Season) {
        setNewPlan({
            ...newDegreePlan,
            semesters: [
                ...newDegreePlan.semesters,
                {
                    season: season,
                    year: year,
                    courses: []
                }
            ]
        });
    }

    return (
        <div>
            <Button
                className="go_back_to plan_list"
                variant="danger"
                onClick={resetView}
            >
                {"Exit"}
            </Button>
            <Button className="add_button" onClick={handleShowModal}>
                Add New Semester
            </Button>
            <SemesterList
                semesters={newDegreePlan.semesters}
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
                semesters={newDegreePlan.semesters}
            ></AddSemesterModal>
        </div>
    );
};
