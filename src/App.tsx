import React, { useState } from "react";
import "./App.css";
import { IntroModal } from "./components/IntroModal";

import { SwitchPlan } from "./components/SwitchPlan";
import { AddSemesterModal } from "./components/SemesterModal";
import { Season, Semester } from "./interfaces/semester";
import { Button } from "react-bootstrap";

function App(): JSX.Element {
    //for Intro
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const handleClose = () => setShowIntro(false);

    //for add semester button
    const [showAddSemester, setAddSemester] = useState(false);
    const [semester, setSemester] = useState<Semester[]>([]);

    const handleShowModal = () => setAddSemester(true);
    const handleCloseModal = () => setAddSemester(false);

    function addNewSemester(year: number, season: Season) {
        setSemester((prevSemester) => [
            ...prevSemester,
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

    function print() {
        console.log(semester);
    }

    return (
        <div className="App">
            <IntroModal show={showIntro} handleClose={handleClose}></IntroModal>
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <SwitchPlan></SwitchPlan>
            <Button className="add_botton" onClick={handleShowModal}>
                Add New Semester
            </Button>
            <Button className="clear_botton" onClick={clearSemester}>
                Clear All
            </Button>
            <AddSemesterModal
                show={showAddSemester}
                handleClose={handleCloseModal}
                addSemester={addNewSemester}
            ></AddSemesterModal>
            <Button onClick={print}>Print</Button>
        </div>
    );
}

export default App;
