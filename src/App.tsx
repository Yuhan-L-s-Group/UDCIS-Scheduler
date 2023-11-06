import React, { useState } from "react";
import "./App.css";

import { Button } from "react-bootstrap";
import { IntroModal } from "./components/IntroModal";
import { SwitchPlan } from "./components/SwitchPlan";
import { AddSemesterModal } from "./components/SemesterModal";
import { Season, Semester } from "./interfaces/semester";
import { SemesterDisplay } from "./components/SemesterDisplay";
import { SemesterList } from "./components/SemsterList";
import { TwoModals } from "./components/TwoModals";
import { Course } from "./interfaces/course";

function App(): JSX.Element {
    //for Intro
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const handleClose = () => setShowIntro(false);

    //for add semester button
    const [showAddSemester, setAddSemester] = useState(false);
    const [semesters, setSemester] = useState<Semester[]>([]);

    const handleShowModal = () => setAddSemester(true);
    const handleCloseModal = () => setAddSemester(false);

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

    function print() {
        console.log(semesters);
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

            <Button className="add_button" onClick={handleShowModal}>
                Add New Semester
            </Button>
            <SemesterList
                semesters={semesters}
                deleteSemester={deleteSemester}
            ></SemesterList>

            <Button className="clear_button" onClick={clearSemester}>
                Clear All
            </Button>
            <AddSemesterModal
                showAddSemester={showAddSemester}
                handleClose={handleCloseModal}
                addSemester={addNewSemester}
                semesters={semesters}
            ></AddSemesterModal>
            {/* <Button onClick={print}>Print</Button> */}
            {/* <TwoModals
                semesters={semesters}
                setSemester={setSemester}
            ></TwoModals> */}
            <TwoModals
                semesters={semesters}
                setSemester={setSemester}
            ></TwoModals>
        </div>
    );
}

export default App;
