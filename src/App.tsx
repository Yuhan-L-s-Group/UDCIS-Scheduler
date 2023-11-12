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
import CoursesTable from "./components/courseTable";
import Courses from "./data/course.json";
import { Course } from "./interfaces/course";
import Search from "./components/Search";
import { text } from "body-parser";
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
    //for store user's name
    const [Name, setName] = useState("");
    const [renderName, setrenderName] = useState(false);
    const [isNameField, setNamefield] = useState(true);

    const [isHomepage, setHomepage] = useState(true);

    //render clear all button
    const [isDisplayEmpty, setDisplayEmpty] = useState(false);
    const closeHome = () => {
        setHomepage(false);
    };
    const ConfirmName = () => {
        setrenderName(true);
        setNamefield(false);
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
    //for wwitch either search bar or Course list
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
                            <button onClick={closeHome} className="homebutton">
                                CLICK
                            </button>
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

                    <SwitchPlan></SwitchPlan>
                    <Container>
                        <Row>
                            <Col>
                                {" "}
                                <br />
                                <br />
                                <br />
                                <button
                                    className="SwichButton"
                                    onClick={handleSwitch}
                                >
                                    Switch
                                </button>
                                <br />
                                <br />
                                <br />
                                {Swicth ? (
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
                                ) : (
                                    <div style={{ textAlign: "left" }}>
                                        <span className="modifyCourseList">
                                            {" "}
                                            CoursesList{" "}
                                        </span>
                                        <Button
                                            variant="primary"
                                            onClick={openAddCourseWindow}
                                        >
                                            Add Course
                                        </Button>
                                        <CoursesTable
                                            ModifiedCourseList={
                                                ModifiedCourseList
                                            }
                                            onClose={closeAddCourseWindow}
                                            listCourses={listCourses}
                                            setListCourses={setListCourses}
                                            semesters={semesters}
                                            setSemester={setSemester}
                                        />
                                        {isAddCourseOpen && (
                                            <div>
                                                <AddCourse
                                                    onClose={
                                                        closeAddCourseWindow
                                                    }
                                                    listCourses={listCourses}
                                                    setListCourses={
                                                        setListCourses
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
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
