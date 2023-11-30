/* eslint-disable no-extra-parens */
import React, { useState, useEffect } from "react";
import "./App.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import { IntroModal } from "./components/IntroModal";
import { Semester } from "./interfaces/semester";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo1 from "./pictures/udlogo2.jpg";
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

    function clearAllinDegreePlan() {
        // clear all semester in degree plan so there will be no semesters in degree plan
        setSemester([]);
        setDisplayEmpty(false);
        SelecetedEditdDegreePlan.semesters = [];
        const findDegreeIndex = degreeList.findIndex(
            (degreePlan) => degreePlan === SelecetedEditdDegreePlan
        );
        degreeList[findDegreeIndex] = SelecetedEditdDegreePlan;
        const update = [...degreeList];
        setDegreeList(update);
        // console.log(degreeList[findDegreeIndex]);
    }

    function modifysemster(semester: Semester[]) {
        setSemester(semester);
    }
    //for render course list
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [listCourses, setListCourses] = useState<Course[]>(Courses);

    const ModifiedCourseList = [...listCourses]; // this is for edit course component

    //for degree plan modal
    const [isDegreePlanOpen, setisDegreePlanOpen] = useState(false);
    const handleClickAddDegreePlan = () => {
        setisDegreePlanOpen(true);
        setIsRenderDegreeTable(true);
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
    const [selectedDegreePlan, setselectedDegreePlan] = useState<DegreePlan>({
        name: degreeList.length === 1 ? degreeList[0].name : "",
        concentration: "" as Concentration,
        semesters: []
    });

    const handleClickEdit = (EditdDegreePlan: DegreePlan) => {
        setIsEditDegreeOpen(true);
        setIsdegreeList(false);
        setIsaddDegreeButton(false);
        setSelecetedEditdDegreePlan(EditdDegreePlan);
        const updatedSemesters = [...EditdDegreePlan.semesters];
        setSemester(updatedSemesters);
    };
    // is rendering degree plan table
    const [isRenderDegreeTable, setIsRenderDegreeTable] = useState(false);
    //delete degree plan from degree list
    const handleDeleteDegreeplan = (degreePlan: DegreePlan) => {
        const findDegreeIndex = degreeList.findIndex(
            (plan) => plan === degreePlan
        );
        degreeList.splice(findDegreeIndex, 1);
        setDegreeList([...degreeList]);
    };
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;

        if (inputElement && inputElement.files) {
            setFile(inputElement.files[0]);
        }
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
            };

            fileReader.readAsText(file);
        }
    };
    return (
        <div className="App">
            {isHomepage ? ( // the first page when you open the web
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
                                        <form>
                                            <input
                                                type={"file"}
                                                id={"csvFileInput"}
                                                accept={".csv"}
                                                onChange={handleOnChange}
                                            />

                                            <button
                                                onClick={(e) => {
                                                    handleOnSubmit(e);
                                                }}
                                            >
                                                IMPORT CSV
                                            </button>
                                        </form>
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
                                            setAddSemester={setAddSemester}
                                            setDisplayEmpty={setDisplayEmpty}
                                            setIsEditDegreeOpen={
                                                setIsEditDegreeOpen
                                            }
                                            selectedDegreePlan={
                                                selectedDegreePlan
                                            }
                                            setselectedDegreePlan={
                                                setselectedDegreePlan
                                            }
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
                                {isDegreeList && ( //degree list box
                                    <div className="semester_box">
                                        <div className="DegreeListTitle-view">
                                            {"Degree List"}
                                        </div>
                                        <br />
                                        {isAddDegreeButton && (
                                            <Button
                                                onClick={
                                                    handleClickAddDegreePlan
                                                }
                                            >
                                                Add New Degree Plan
                                            </Button>
                                        )}
                                        <br />
                                        {isRenderDegreeTable && (
                                            //individual degree plan
                                            <table>
                                                <thead>
                                                    {" "}
                                                    <tr>
                                                        <th>Degree Name</th>{" "}
                                                        <th>Concentration</th>
                                                        <th>Modify</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                {degreeList.map(
                                                    (degreePlan) => (
                                                        <tr
                                                            key={
                                                                degreePlan.name
                                                            }
                                                        >
                                                            <td>
                                                                {" "}
                                                                {
                                                                    degreePlan.name
                                                                }
                                                            </td>
                                                            <td>
                                                                {" "}
                                                                {
                                                                    degreePlan.concentration
                                                                }
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={() => {
                                                                        handleClickEdit(
                                                                            degreePlan
                                                                        );
                                                                    }}
                                                                    className="EditDegreePlanView"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() =>
                                                                        handleDeleteDegreeplan(
                                                                            degreePlan
                                                                        )
                                                                    }
                                                                >
                                                                    x
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </table>
                                        )}
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
                                            clearAllinDegreePlan={
                                                clearAllinDegreePlan
                                            }
                                            handleShowModal={handleShowModal}
                                            showAddSemester={showAddSemester}
                                            handleClose={handleCloseModal}
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
                                            selectedDegreePlan={
                                                selectedDegreePlan
                                            }
                                        />
                                    </div>
                                )}
                            </Col>{" "}
                        </Row>
                    </Container>
                    <Row className="bottom-view">
                        @2023 Fall Univerisity of Delaware
                    </Row>
                </div>
            )}
        </div>
    );
}

export default App;
