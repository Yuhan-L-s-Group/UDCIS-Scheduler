/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import { IntroModal } from "./components/IntroModal";
import { SwitchPlan } from "./components/SwitchPlan";
import { AddSemesterModal } from "./components/SemesterModal";
import { Season, Semester } from "./interfaces/semester";
import { SemesterList } from "./components/SemsterList";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo1 from "./pictures/udlogo2.jpg";
import { AddCourse } from "./components/AddCourse";
// import CoursesTable from "./components/courseTable";
import Courses from "./data/CourseList.json";
import { Course } from "./interfaces/course";
import Search from "./components/Search";
import { AddPlanModal } from "./components/AddPlanModal";
import { Concentration, DegreePlan } from "./interfaces/degreePlan";

// import { text } from "body-parser";
function App(): JSX.Element {
    //for Intro
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const handleClose = () => setShowIntro(false);

    //for add semester button
    const [showAddSemester, setAddSemester] = useState(false);
    const [semesters, setSemester] = useState<Semester[]>([]);
    const handleShowModal = () => {
        setAddSemester(true);
        setDisplayEmpty(true);
    };
    const handleCloseModal = () => setAddSemester(false);

    //for add degree button
    const [showAddPlan, setAddPlan] = useState(false);
    const [degreePlan, setPlan] = useState<DegreePlan[]>([]);
    const handleShowPlanModal = () => {
        setAddPlan(true);
    };
    const handleClosePlanmModal = () => setAddPlan(false);

    //for store user's name
    const [Name, setName] = useState("");
    const [renderName, setrenderName] = useState(false);
    const [isNameField, setNamefield] = useState(true);

    const [isHomepage, setHomepage] = useState(true);

    //render clear all button
    const [isDisplayEmpty, setDisplayEmpty] = useState(false);

    const ConfirmName = () => {
        setrenderName(true);
        setNamefield(false);
        setHomepage(false);
    };

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

    function addNewPlan(name: string, concentration: Concentration) {
        setPlan([
            ...degreePlan,
            {
                name: name,
                concentration: concentration,
                semesters: []
                //credit: 0
            }
        ]);
    }

    function clearSemester() {
        setSemester([]);
        setDisplayEmpty(false);
    }

    function modifysemster(semester: Semester[]) {
        setSemester(semester);
    }
    //for render course list
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [listCourses, setListCourses] = useState<Course[]>(Courses);

    const ModifiedCourseList = [...listCourses]; // this is for edit course component

    const openAddCourseWindow = () => {
        setAddCourseOpen(true);
    };

    const closeAddCourseWindow = () => {
        setAddCourseOpen(false);
    };
    //for switch either search bar or the Course list
    const [Swicth, setSwicth] = useState(false);
    const handleSwitch = () => {
        setSwicth(!Swicth);
    };
    return (
        <div className="App">
            {isHomepage ? (
                <div>
                    <div className="homepage">
                        <div className="homepage2">
                            {" "}
                            <h5 className="welcome">
                                Welcome to the Best Schedule Class Web
                            </h5>
                            {/* <button onClick={closeHome} className="homebutton">
                                CLICK
                            </button> */}
                            <div>
                                {isNameField && (
                                    <div className="nameEntry">
                                        <InputGroup>
                                            <Form.Control
                                                placeholder="Your Name"
                                                value={Name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                            <button
                                                onClick={ConfirmName}
                                                className="ConfirmNameView"
                                            >
                                                Confirm
                                            </button>
                                        </InputGroup>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mainBody">
                    <IntroModal
                        show={showIntro}
                        handleClose={handleClose}
                    ></IntroModal>
                    <header className="App-header">
                        <img src={logo1} alt="ud logo1" className="udlogo1" />
                    </header>
                    <br />
                    <Button
                        className="add_plan_button"
                        onClick={handleShowPlanModal}
                    >
                        New Degree Plan
                    </Button>
                    <SwitchPlan></SwitchPlan>
                    <AddPlanModal
                        show={showAddPlan}
                        handleClose={handleClosePlanmModal}
                        addPlan={addNewPlan}
                        degreePlans={degreePlan}
                    ></AddPlanModal>
                    <Container>
                        <Row>
                            <Col>
                                {" "}
                                <br />
                                <br />
                                <br />
                                {/* <button
                                    className="SwichButton"
                                    onClick={handleSwitch}
                                >
                                    Switch
                                </button> */}
                                <br />
                                <br />
                                <br />
                                {
                                    <span>
                                        <Search
                                            ModifiedCourseList={
                                                ModifiedCourseList
                                            }
                                            listCourses={listCourses}
                                            setListCourses={setListCourses}
                                            semesters={semesters}
                                            setSemester={setSemester}
                                        ></Search>
                                    </span>
                                }
                            </Col>
                            <Col>
                                <br />
                                <Button
                                    className="add_button"
                                    onClick={handleShowModal}
                                >
                                    Add New Semester
                                </Button>
                                <SemesterList
                                    semesters={semesters}
                                    Name={Name}
                                    renderName={renderName}
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
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default App;
