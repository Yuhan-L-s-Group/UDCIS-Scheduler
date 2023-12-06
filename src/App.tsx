/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";
import { IntroModal } from "./components/IntroModal";
import { Semester } from "./interfaces/semester";
import InputGroup from "react-bootstrap/InputGroup";
import logo1 from "./pictures/udlogo2.jpg";
import Courses from "./data/CourseList.json";
import { Course } from "./interfaces/course";
import Search from "./components/Search";
import DegreeManage from "./components/DegreeManage";
import { Concentration, DegreePlan } from "./interfaces/degreePlan";
import EditDegreePlan from "./components/EditDegreePlan";
import CoursePool from "./components/CoursePool";
import { Button, Modal, Col, Form, Row, Container } from "react-bootstrap";
import EditCourse from "./components/EditCourse";
import ExportCSV from "./components/ExportCSV";

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
        console.log(selectedDegreePlan);
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
                            <Col md={3}>
                                {isCourseBar && (
                                    <div className="courseBar_box">
                                        <div className="DegreeListTitle-view">
                                            {"Course Information"}
                                        </div>
                                        <br />
                                        <br />
                                        {IsCourseInfo && (
                                            <div>
                                                <div>
                                                    {"Course Code: "}
                                                    <></>
                                                    {
                                                        listCourses[courseIndex]
                                                            .code
                                                    }
                                                </div>
                                                <br />

                                                <div>
                                                    {" "}
                                                    {"Course Name: "}
                                                    {
                                                        listCourses[courseIndex]
                                                            .name
                                                    }
                                                </div>
                                                <br />
                                                <div>
                                                    {" "}
                                                    {"Course Credits: "}
                                                    {
                                                        listCourses[courseIndex]
                                                            .credits
                                                    }
                                                </div>
                                                <br />
                                                <div>
                                                    {" "}
                                                    {"Course description: "}
                                                    {
                                                        listCourses[courseIndex]
                                                            .descr
                                                    }
                                                </div>
                                                <br />
                                                <Button
                                                    variant="success"
                                                    onClick={handleClickPool}
                                                >
                                                    Add to Course Pool
                                                </Button>
                                                <br />
                                                <br />
                                                <span>
                                                    {" "}
                                                    <Button
                                                        onClick={() =>
                                                            gotYouCourse(text)
                                                        }
                                                    >
                                                        {" "}
                                                        Edit
                                                    </Button>
                                                </span>
                                            </div>
                                        )}

                                        <div>
                                            {
                                                <div>
                                                    <span> </span>
                                                    <br />
                                                    <br />
                                                    <div className="addedCourseTopoolPropmt">
                                                        {isAddedCourseTopool &&
                                                            "You have already added it to the pool of courses"}
                                                    </div>
                                                    {isEditCourseOpen && ( // edit course
                                                        <>
                                                            <div className="editButtonInSwitch">
                                                                <EditCourse
                                                                    listCourses={
                                                                        listCourses
                                                                    }
                                                                    setListCourses={
                                                                        setListCourses
                                                                    }
                                                                    closeEditCourse={
                                                                        closeEditCourse
                                                                    }
                                                                    CourseSlected={
                                                                        selectedCourse
                                                                    }
                                                                    ModifiedCourseList={
                                                                        ModifiedCourseList
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                    {ErrorMessage && ( // error message when user trys to add the course which has already been selceted into the semester list
                                                        <Modal
                                                            show={true}
                                                            onHide={CloseError}
                                                        >
                                                            <Modal.Header
                                                                closeButton
                                                            >
                                                                <Modal.Title className="modifyErrorTitle">
                                                                    Wrong
                                                                    Selection
                                                                </Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                You have already
                                                                selected this
                                                                course. Please
                                                                make sure you do
                                                                not select the
                                                                same course.
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={
                                                                        CloseError
                                                                    }
                                                                >
                                                                    Close
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    )}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </Col>{" "}
                            <Col md={5}>
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
                                            setListCourses={setListCourses}
                                            degreeList={degreeList}
                                            setDegreeList={setDegreeList}
                                            setDisplayEmpty={setDisplayEmpty}
                                            selectedDegreePlan={
                                                selectedDegreePlan
                                            }
                                            setselectedDegreePlan={
                                                setselectedDegreePlan
                                            }
                                            setIsAddedCourseTopool={
                                                setIsAddedCourseTopool
                                            }
                                            theCourse={theCourse}
                                            isCourseToDegreePlanOpen={
                                                isCourseToDegreePlanOpen
                                            }
                                            setisCourseToDegreePlanOpen={
                                                setisCourseToDegreePlanOpen
                                            }
                                            setIsdegreeList={setIsdegreeList}
                                            setCourseBar={setCourseBar}
                                            setcourseIndex={setcourseIndex}
                                            setCount={setCount}
                                            setText={setText}
                                            text={text}
                                            setIsRenderPoolOfCourse={
                                                setIsRenderPoolOfCourse
                                            }
                                            setIsCourseInfo={setIsCourseInfo}
                                            coursePool={coursePool}
                                            setCoursePool={setCoursePool}
                                        ></Search>
                                    </span>
                                }
                                {IsRenderPoolOfCourse && (
                                    <CoursePool
                                        coursePool={coursePool}
                                        deletePool={deletePool}
                                        AddCourseToDegreePlan={
                                            AddCourseToDegreePlan
                                        }
                                        IsRenderPoolTable={IsRenderPoolTable}
                                    />
                                )}
                            </Col>
                            <Col md={3}>
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
                                    <div className="degreeListBox">
                                        <div className="DegreeListTitle-view">
                                            {"Degree List"}
                                        </div>
                                        <br />
                                        {degreeList.length === 0 ? (
                                            <p>Add a degree plan to start!</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        {isAddDegreeButton && (
                                            <div>
                                                <Button
                                                    onClick={
                                                        handleClickAddDegreePlan
                                                    }
                                                >
                                                    Add New Degree Plan
                                                </Button>
                                            </div>
                                        )}
                                        <br />
                                        {isRenderDegreeTable && (
                                            //individual degree plan.
                                            <table className="degreeTable">
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
                                        <br />
                                        <ExportCSV
                                            degreeList={degreeList}
                                        ></ExportCSV>
                                    </div>
                                )}
                                {isEditDegreeOpen && (
                                    <div>
                                        <EditDegreePlan
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
                                            setCoursePool={setCoursePool}
                                            coursePool={coursePool}
                                        />
                                    </div>
                                )}
                            </Col>{" "}
                        </Row>
                        <Row>
                            <Col md={4}> </Col>
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
