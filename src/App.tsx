/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import { IntroModal } from "./components/IntroModal";
import { SwitchPlan } from "./components/SwitchPlan";
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
import DegreeManage from "./components/DegreeManage";
import { Concentration, DegreePlan } from "./interfaces/degreePlan";
import EditDegreePlan from "./components/EditDegreePlan";
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
    //for degree plan modal
    const [isDegreePlanOpen, setisDegreePlanOpen] = useState(false);
    const handleClickAddDegreePlan = () => {
        setisDegreePlanOpen(true);
    };
    const [degreeList, setDegreeList] = useState<DegreePlan[]>([]);
    const [isAddDegreeButton, setIsaddDegreeButton] = useState(true);
    // for rendering degree plan list
    const [isDegreeList, setIsdegreeList] = useState(true);
    const [SelecetedEditdDegreePlan, setSelecetedEditdDegreePlan] =
        useState<DegreePlan>({
            name: "",
            concentration: "" as Concentration,
            semesters: []
        });
    const [isEditDegreeOpen, setIsEditDegreeOpen] = useState(false);
    const handleClickEdit = (EditdDegreePlan: DegreePlan) => {
        setIsEditDegreeOpen(true);
        setIsdegreeList(false);
        setIsaddDegreeButton(false);
        setSelecetedEditdDegreePlan(EditdDegreePlan);
    };
    //pass selected degree plan to search
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
                    <SwitchPlan></SwitchPlan>
                    <Container>
                        <Row>
                            <Col>
                                {" "}
                                <br />
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
                                            degreeList={degreeList}
                                            setDegreeList={setDegreeList}
                                        ></Search>
                                    </span>
                                }
                            </Col>
                            <Col>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                {isAddDegreeButton && (
                                    <Button onClick={handleClickAddDegreePlan}>
                                        Add New Degree Plan
                                    </Button>
                                )}
                                {isDegreePlanOpen && (
                                    <div>
                                        <DegreeManage
                                            setisDegreePlanOpen={
                                                setisDegreePlanOpen
                                            }
                                            degreeList={degreeList}
                                            setDegreeList={setDegreeList}
                                        />
                                    </div>
                                )}
                                <br />
                                <br />
                                <br />
                                {isDegreeList && (
                                    <div className="semester_box">
                                        <table>
                                            <thead>
                                                {" "}
                                                <tr>
                                                    <th>Degree Name</th>{" "}
                                                    <th>Concentration</th>
                                                    <th>Modify</th>
                                                </tr>
                                            </thead>
                                            {degreeList.map((degreePlan) => (
                                                <tr key={degreePlan.name}>
                                                    <td> {degreePlan.name}</td>
                                                    <td>
                                                        {" "}
                                                        {
                                                            degreePlan.concentration
                                                        }
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                handleClickEdit(
                                                                    degreePlan
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </table>
                                    </div>
                                )}
                                {isEditDegreeOpen && (
                                    <div>
                                        <EditDegreePlan
                                            isEditDegreeOpen={isEditDegreeOpen}
                                            semesters={semesters}
                                            Name={Name}
                                            renderName={renderName}
                                            modifysemster={modifysemster}
                                            isDisplayEmpty={isDisplayEmpty}
                                            clearSemester={clearSemester}
                                            handleShowModal={handleShowModal}
                                            showAddSemester={showAddSemester}
                                            handleClose={handleCloseModal}
                                            addSemester={addNewSemester}
                                            setIsEditDegreeOpen={
                                                setIsEditDegreeOpen
                                            }
                                            setIsdegreeList={setIsdegreeList}
                                            setIsaddDegreeButton={
                                                setIsaddDegreeButton
                                            }
                                            SelecetedEditdDegreePlan={
                                                SelecetedEditdDegreePlan
                                            }
                                            degreeList={degreeList}
                                            setDegreeList={setDegreeList}
                                        />
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default App;
