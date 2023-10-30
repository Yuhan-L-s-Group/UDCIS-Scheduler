import React from "react";
import "./App.css";
import { AddSemester } from "./AddSemester";
function handleClose(): void {
    console.log("handle");
}
function addSemester(string: string): void {
    console.log(string);
}

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <AddSemester
                show={true}
                handleClose={handleClose}
                addSemester={addSemester}
            ></AddSemester>
        </div>
    );
}

export default App;
