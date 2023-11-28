import React, { useState } from "react";
import courses from "../data/CourseList.json";
import { Course } from "../interfaces/course";
import { Concentration, DegreePlan } from "../interfaces/degreePlan";
import { Button, Modal, Col, Form, Container, Row } from "react-bootstrap";
import { Semester, Season } from "../interfaces/semester";
import { SemesterList } from "./SemsterList";
import { SemesterModal } from "./SemesterModal";
import { Requirement } from "./Requirement";

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
    setIsEditDegreeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsdegreeList: React.Dispatch<React.SetStateAction<boolean>>;
    setIsaddDegreeButton: React.Dispatch<React.SetStateAction<boolean>>;
    SelecetedEditdDegreePlan: DegreePlan;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    selectedDegreePlan: DegreePlan;
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
    setIsEditDegreeOpen,
    setIsdegreeList,
    setIsaddDegreeButton,
    SelecetedEditdDegreePlan,
    degreeList,
    setDegreeList,
    selectedDegreePlan
}: EditDegreePlanProps) => {
    return (
        <div>
            {/* <Button className="add_button" onClick={handleShowModal}>
                {" "}
                Add New Semester
            </Button> */}
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
                degreeList={degreeList}
                setDegreeList={setDegreeList}
                selectedDegreePlan={selectedDegreePlan}
                handleShowModal={handleShowModal}
            ></SemesterList>
            <br />
            <br />
            <SemesterModal
                showAddSemester={showAddSemester}
                handleClose={handleClose}
                semesters={semesters}
                SelecetedEditdDegreePlan={SelecetedEditdDegreePlan}
                degreeList={degreeList}
                setDegreeList={setDegreeList}
                modifysemster={modifysemster}
            ></SemesterModal>
            <Requirement degreePlan={SelecetedEditdDegreePlan}></Requirement>
        </div>
    );
};
export default EditDegreePlan;
