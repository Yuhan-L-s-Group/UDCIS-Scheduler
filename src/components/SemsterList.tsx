/* eslint-disable no-extra-parens */
// eslint conflict with prettier
import { SemesterDisplay } from "./SemesterDisplay";
import { Semester } from "../interfaces/semester";
import "../App.css";
import React, { useState } from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Requirement } from "./Requirement";

// It contains all the semesters into "semesters" varible and iterate each semester into "SemesterDisplay" component
// Addtionally it automatically caculates the cumulative credits
export const SemesterList = ({
    semesters,
    Name,
    renderName,
    modifysemster,
    isDisplayEmpty,
    clearAllinDegreePlan,
    setIsEditDegreeOpen,
    setIsdegreeList,
    setIsaddDegreeButton,
    degreeList,
    setDegreeList,
    handleShowModal,
    SelecetedEditdDegreePlan,
    setCoursePool,
    coursePool,
    DragCouse,
    setDragCouse
}: {
    semesters: Semester[];
    Name: string;
    renderName: boolean;
    modifysemster: (semester: Semester[]) => void;
    isDisplayEmpty: boolean;
    clearAllinDegreePlan: () => void;
    setIsEditDegreeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsdegreeList: React.Dispatch<React.SetStateAction<boolean>>;
    setIsaddDegreeButton: React.Dispatch<React.SetStateAction<boolean>>;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    handleShowModal: () => void;
    SelecetedEditdDegreePlan: DegreePlan;
    setCoursePool: React.Dispatch<React.SetStateAction<Course[]>>;
    coursePool: Course[];
    DragCouse: Course;
    setDragCouse: React.Dispatch<React.SetStateAction<Course>>;
}) => {
    const [showReq, setShowReq] = useState<boolean>(false);
    const handleShowReq = () => setShowReq(true);
    const handleCloseReq = () => setShowReq(false);
    const handleBack = () => {
        setIsEditDegreeOpen(false);
        setIsdegreeList(true);
        setIsaddDegreeButton(true);
    };
    return (
        <>
            <br />
            <br />

            {
                <div>
                    <div className="semester_box">
                        <div className="semesterListName-view"> </div>
                        <div className="DegreeListTitle-view">
                            Semesters List
                        </div>
                        <Button className="show_Req" onClick={handleShowReq}>
                            Show Requirement
                        </Button>
                        <Requirement
                            degreePlan={SelecetedEditdDegreePlan}
                            show={showReq}
                            handleClose={handleCloseReq}
                        ></Requirement>
                        <br />
                        <br />
                        {renderName && <div className="name">{Name}</div>}
                        <div className="modifytheCreditsText">
                            {SelecetedEditdDegreePlan.name}{" "}
                            {"Cumulative Credits: "}
                            {semesters.reduce(
                                (acc, iter) =>
                                    acc +
                                    iter.courses.reduce(
                                        (acc1, iter1) =>
                                            acc1 + parseInt(iter1.credits),
                                        0
                                    ),
                                0
                            )}
                            {" credits"}
                        </div>
                        <br />
                        <Button
                            className="add_button"
                            onClick={handleShowModal}
                        >
                            {" "}
                            Add New Semester
                        </Button>

                        {semesters.map((semester: Semester): JSX.Element => {
                            return (
                                <div key={semester.year + semester.season}>
                                    <br />
                                    <SemesterDisplay
                                        semester={semester}
                                        modifysemster={modifysemster}
                                        semesters={semesters}
                                        degreeList={degreeList}
                                        setDegreeList={setDegreeList}
                                        SelecetedEditdDegreePlan={
                                            SelecetedEditdDegreePlan
                                        }
                                        setCoursePool={setCoursePool}
                                        coursePool={coursePool}
                                        DragCouse={DragCouse}
                                        setDragCouse={setDragCouse}
                                    />
                                </div>
                            );
                        })}
                        {isDisplayEmpty && (
                            <button
                                className="clear_button"
                                onClick={clearAllinDegreePlan}
                            >
                                Clear All
                            </button>
                        )}
                        <br />
                        <br />
                        <div>
                            <button
                                onClick={handleBack}
                                className="backTodegreeListView"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
