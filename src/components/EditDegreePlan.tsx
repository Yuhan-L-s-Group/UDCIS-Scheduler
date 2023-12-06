import React from "react";
import { DegreePlan } from "../interfaces/degreePlan";
//import { Concentration} from "../interfaces/degreePlan";
import { Semester } from "../interfaces/semester";
import { SemesterList } from "./SemsterList";
import { SemesterModal } from "./SemesterModal";
import { Requirement } from "./Requirement";
import { Course } from "../interfaces/course";

interface EditDegreePlanProps {
    semesters: Semester[];
    Name: string;
    renderName: boolean;
    modifysemster: (semester: Semester[]) => void;
    isDisplayEmpty: boolean;
    clearAllinDegreePlan: () => void;
    handleShowModal: () => void;
    showAddSemester: boolean;
    handleClose: () => void;
    setIsEditDegreeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsdegreeList: React.Dispatch<React.SetStateAction<boolean>>;
    setIsaddDegreeButton: React.Dispatch<React.SetStateAction<boolean>>;
    SelecetedEditdDegreePlan: DegreePlan;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    setCoursePool: React.Dispatch<React.SetStateAction<Course[]>>;
    coursePool: Course[];
}
const EditDegreePlan = ({
    semesters,
    Name,
    renderName,
    modifysemster,
    isDisplayEmpty,
    clearAllinDegreePlan,
    handleShowModal,
    showAddSemester,
    handleClose,
    setIsEditDegreeOpen,
    setIsdegreeList,
    setIsaddDegreeButton,
    SelecetedEditdDegreePlan,
    degreeList,
    setDegreeList,
    setCoursePool,
    coursePool
}: EditDegreePlanProps) => {
    return (
        <div>
            <SemesterList
                semesters={semesters}
                Name={Name}
                renderName={renderName}
                modifysemster={modifysemster}
                isDisplayEmpty={isDisplayEmpty}
                clearAllinDegreePlan={clearAllinDegreePlan}
                setIsEditDegreeOpen={setIsEditDegreeOpen}
                setIsdegreeList={setIsdegreeList}
                setIsaddDegreeButton={setIsaddDegreeButton}
                degreeList={degreeList}
                setDegreeList={setDegreeList}
                handleShowModal={handleShowModal}
                SelecetedEditdDegreePlan={SelecetedEditdDegreePlan}
                setCoursePool={setCoursePool}
                coursePool={coursePool}
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
