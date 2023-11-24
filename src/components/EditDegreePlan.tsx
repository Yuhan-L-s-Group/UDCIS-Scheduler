import React, { useState } from "react";
import courses from "../data/CourseList.json";
import { Course } from "../interfaces/course";
import { Concentration, DegreePlan } from "../interfaces/degreePlan";
import { Button, Modal, Col, Form, Container, Row } from "react-bootstrap";
import { Semester, Season } from "../interfaces/semester";
import { SemesterList } from "./SemsterList";
import { AddSemesterModal } from "./SemesterModal";
interface EditDegreePlanProps {
    isEditDegreeOpen: boolean;
    semesters: Semester[];
    Name: string;
    renderName: boolean;
    modifysemster: (semester: Semester[]) => void;
    isDisplayEmpty: boolean;
    clearSemester: () => void;
    handleShowModal: () => void;
    showAddSemester: boolean;
    handleClose: () => void;
    addSemester: (year: number, season: Season) => void;
    setIsEditDegreeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsdegreeList: React.Dispatch<React.SetStateAction<boolean>>;
    setIsaddDegreeButton: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditDegreePlan = ({
    isEditDegreeOpen,
    semesters,
    Name,
    renderName,
    modifysemster,
    isDisplayEmpty,
    clearSemester,
    handleShowModal,
    showAddSemester,
    handleClose,
    addSemester,
    setIsEditDegreeOpen,
    setIsdegreeList,
    setIsaddDegreeButton
}: EditDegreePlanProps) => {
    return (
        <div>
            <Button className="add_button" onClick={handleShowModal}>
                {" "}
                Add New Semester
            </Button>
            <SemesterList
                semesters={semesters}
                Name={Name}
                renderName={renderName}
                modifysemster={modifysemster}
                isDisplayEmpty={isDisplayEmpty}
                clearSemester={clearSemester}
                setIsEditDegreeOpen={setIsEditDegreeOpen}
                setIsdegreeList={setIsdegreeList}
                setIsaddDegreeButton={setIsaddDegreeButton}
            ></SemesterList>
            <br />
            <br />
            <AddSemesterModal
                showAddSemester={showAddSemester}
                handleClose={handleClose}
                addSemester={addSemester}
                semesters={semesters}
            ></AddSemesterModal>
        </div>
    );
};
export default EditDegreePlan;
