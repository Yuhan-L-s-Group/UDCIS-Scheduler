/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import { IntroModal } from "./components/IntroModal";
import { SwitchPlan } from "./components/SwitchPlan";
import { Season, Semester } from "./interfaces/semester";
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
import { PoolList } from "./components/PoolList";
import { PlanList } from "./components/PlanList";

// import { text } from "body-parser";
function App(): JSX.Element {
    //for Intro
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const handleClose = () => setShowIntro(false);

    //for add semester button
    /* const [showAddSemester, setAddSemester] = useState(false);
    const [semesters, setSemester] = useState<Semester[]>([]);
    const handleShowModal = () => {
        setAddSemester(true);
        setDisplayEmpty(true);
    };
    const handleCloseModal = () => setAddSemester(false); */

    //for add degree button
    const [showAddPlan, setAddPlan] = useState(false);
    const [degreePlans, setPlan] = useState<DegreePlan[]>([]);
    const handleShowPlanModal = () => {
        setAddPlan(true);
    };
    const handleClosePlanModal = () => setAddPlan(false);

    //for store user's name
    const [Name, setName] = useState("");
    const [renderName, setrenderName] = useState(false);
    const [isNameField, setNamefield] = useState(true);

    const [isHomepage, setHomepage] = useState(true);

    //render clear all button
    //const [isDisplayEmpty, setDisplayEmpty] = useState(false);

    //pool of courses
    const [pool, setPool] = useState<Course[]>([]);

    const ConfirmName = () => {
        setrenderName(true);
        setNamefield(false);
        setHomepage(false);
    };

    function addNewPlan(name: string, concentration: Concentration) {
        setPlan([
            ...degreePlans,
            {
                name: name,
                concentration: concentration,
                semesters: []
            }
        ]);
    }

    /* function clearSemester() {
        setSemester([]);
        setDisplayEmpty(false);
    }

    function modifysemster(semester: Semester[]) {
        setSemester(semester);
    } */
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

    const printAll = () => {
        console.log(degreePlans);
    };

    const printPool = () => {
        console.log(pool);
    };

    const updatePlan = (newPlan: DegreePlan): void => {
        const newPlans = degreePlans.map((plan: DegreePlan): DegreePlan => {
            return plan.name === newPlan.name
                ? { ...newPlan, semesters: [...newPlan.semesters] }
                : { ...plan };
        });
        setPlan([...newPlans]);
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
                    {renderName && <div className="name"> Hi! {Name}</div>}
                    <Button onClick={printAll}>Print</Button>
                    <Button onClick={printPool}>Print Pool</Button>
                    <SwitchPlan></SwitchPlan>
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
                                        {/*<Search
                                            ModifiedCourseList={
                                                ModifiedCourseList
                                            }
                                            listCourses={listCourses}
                                            setListCourses={setListCourses}
                                            semesters={semesters}
                                            setSemester={setSemester}
                                            pool={pool}
                                            setPool={setPool}
                                        ></Search>*/}
                                    </span>
                                }
                                <PoolList pool={pool}></PoolList>
                            </Col>
                            <Col>
                                <br />
                                <PlanList
                                    degreePlans={degreePlans}
                                    showModal={handleShowPlanModal}
                                    updatePlan={updatePlan}
                                ></PlanList>
                                <Button
                                    className="add_plan_button"
                                    onClick={handleShowPlanModal}
                                >
                                    New Degree Plan
                                </Button>
                                <AddPlanModal
                                    show={showAddPlan}
                                    handleClose={handleClosePlanModal}
                                    addPlan={addNewPlan}
                                    degreePlans={degreePlans}
                                ></AddPlanModal>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default App;
