import React from "react";
import "./App.css";
import CoursesTable from "./components/courseTable";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <div className="courses-section">
                <h2>Courses</h2>
                <CoursesTable />
            </div>
        </div>
    );
}

export default App;
