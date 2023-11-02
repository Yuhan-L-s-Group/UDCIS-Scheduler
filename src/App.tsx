import React, { useState } from "react";
import "./App.css";
import { IntroModal } from "./components/IntroModal";

function App(): JSX.Element {
    const [showIntro, setShowIntro] = useState<boolean>(true);
    const handleClose = () => setShowIntro(false);

    return (
        <div className="App">
            <IntroModal show={showIntro} handleClose={handleClose}></IntroModal>
            <header className="App-header">Yuhan L‘s Group</header>
            <p>
                Group Members: Yuhan Lin, Priyanka Chaudhuri, Zonglin Wu, Ziyi
                Zhou, Henry Grant, Thern Diallo
            </p>
        </div>
    );
}

export default App;
