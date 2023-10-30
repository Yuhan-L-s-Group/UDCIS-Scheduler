import React from "react";
import "./App.css";
import { TwoModals } from "./components/TwoModals";
import { Display } from "./components/Display";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <hr />
            <TwoModals />
            {/* <Display /> */}
            <hr />
        </div>
    );
}

export default App;
