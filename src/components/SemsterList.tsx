/* eslint-disable no-extra-parens */
import { SemesterDisplay } from "./SemesterDisplay";
import { Season, Semester } from "../interfaces/semester";
import "../App.css";
import horse from "../pictures/horse.jpg";
import React from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import { Button, Modal, Col, Form, Container, Row } from "react-bootstrap";
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
    selectedDegreePlan,
    handleShowModal,
    SelecetedEditdDegreePlan
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
    selectedDegreePlan: DegreePlan;
    handleShowModal: () => void;
    SelecetedEditdDegreePlan: DegreePlan;
}) => {
    const handleBack = () => {
        setIsEditDegreeOpen(false);
        setIsdegreeList(true);
        setIsaddDegreeButton(true);
    };
    return (
        <>
            <br />
            <br />
            {renderName && <div className="name"> Hi! {Name}</div>}
            <div className="modifytheCreditsText">
                {"Your Cureent Degree Plan Cumulative Credits: "}
                {semesters.reduce(
                    (acc, iter) =>
                        acc +
                        iter.courses.reduce(
                            (acc1, iter1) => acc1 + parseInt(iter1.credits),
                            0
                        ),
                    0
                )}
                {" credits"}
                {/* // {renderName && <img src={horse} alt="horse" />} */}
            </div>
            {
                <div>
                    <div className="semester_box">
                        <div className="semesterListName-view"> </div>
                        <div className="DegreeListTitle-view">
                            Semesters List
                        </div>
                        <br />
                        <Button
                            className="add_button"
                            onClick={handleShowModal}
                        >
                            {" "}
                            Add New Semester
                        </Button>
                        <br />
                        <br />
                        {semesters.map(
                            (semester: Semester): JSX.Element => (
                                <div key={semester.year + semester.season}>
                                    <SemesterDisplay
                                        semester={semester}
                                        modifysemster={modifysemster}
                                        semesters={semesters}
                                        degreeList={degreeList}
                                        setDegreeList={setDegreeList}
                                        selectedDegreePlan={selectedDegreePlan}
                                        SelecetedEditdDegreePlan={
                                            SelecetedEditdDegreePlan
                                        }
                                    />
                                </div>
                            )
                        )}
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
