import React from "react";
import "./App.css";
// import CoursesTable from "./components/courseTable";
import SemesterDisplay from "./components/SemesterDisplay";
import { TwoModals } from "./components/TwoModals";
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <hr></hr>
            <TwoModals></TwoModals>
            <hr></hr>
            <div className="semester-display-position">
                <SemesterDisplay />
            </div>
            <hr></hr>
        </div>
    );
}

export default App;
