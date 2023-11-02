import React, { useState } from "react";
import "./App.css";

import { SwitchPlan } from "./components/SwitchPlan";
import { AddSemesterModal } from "./components/SemesterModal";
import { Season, Semester } from "./interfaces/semester";
import { Button } from "react-bootstrap";

function App(): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const [semester, setSemester] = useState<Semester[]>([]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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

    function print() {
        console.log(semester);
    }

    return (
        <div className="App">
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <SwitchPlan></SwitchPlan>
            <Button className="add_btn" onClick={handleShowModal}>
                Add New Semester
            </Button>
            <AddSemesterModal
                show={showModal}
                handleClose={handleCloseModal}
                addSemester={addNewSemester}
            ></AddSemesterModal>
            <Button onClick={print}>Print</Button>
        </div>
    );
}

export default App;
