import React from "react";
import "./App.css";

import { SwitchPlan } from "./components/SwitchPlan";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
            <SwitchPlan></SwitchPlan>
        </div>
    );
}

export default App;
