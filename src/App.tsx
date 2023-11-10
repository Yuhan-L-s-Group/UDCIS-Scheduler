import React, { useState } from "react";
import "./";

import { Button, Col, Container, Row } from "react-bootstrap";
import { IntroModal } from "./components/IntroModal";
import { SwitchPlan } from "./components/SwitchPlan";
import { AddSemesterModal } from "./components/SemesterModal";
import { Season, Semester } from "./interfaces/semester";
import { SemesterList } from "./components/SemsterList";
import { TwoModals } from "./components/TwoModals";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo1 from "./pictures/udlogo1.jpg";
function App(): JSX.Element {
    //for Intro
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const handleClose = () => setShowIntro(false);

    //for add semester button
    const [showAddSemester, setAddSemester] = useState(false);
    const [semesters, setSemester] = useState<Semester[]>([]);

    const handleShowModal = () => setAddSemester(true);
    const handleCloseModal = () => setAddSemester(false);
    //for store user's name
    const [Name, setName] = useState("");
    const [renderName, setrenderName] = useState(false);
    const [isNameField, setNamefield] = useState(true);
    const [isHomepage, setHomepage] = useState(true);

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
    }

    function deleteSemester(season: Season, year: number) {
        const update = [
            ...semesters.filter(
                (semester: Semester): boolean =>
                    !(season === semester.season && year === semester.year)
            )
        ];
        setSemester([...update]);
    }

    function deleteCourse(semester: Semester[]) {
        setSemester(semester);
    }
    return (
        <>
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
                <div>
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
                                    <button onClick={ConfirmName}>
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
                                <TwoModals
                                    semesters={semesters}
                                    setSemester={setSemester}
                                ></TwoModals>
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
                                    deleteSemester={deleteSemester}
                                    Name={Name}
                                    renderName={renderName}
                                    deleteCourse={deleteCourse}
                                ></SemesterList>
                                <br />
                                <Button
                                    className="clear_button"
                                    onClick={clearSemester}
                                >
                                    Clear All
                                </Button>
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
        </>
    );
}

export default App;
