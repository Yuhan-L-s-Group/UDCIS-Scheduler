import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export type Season = "Fall" | "Winter" | "Spring" | "Summer";

interface Semester {
    season: Season;
    year: number;
}

const SemesterDisplay = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<Season>("Fall");
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );

    const handleAddSemester = () => {
        setShowModal(true);
    };

    const handleDeleteSemester = (index: number) => {
        const newSemesters = [...semesters];
        newSemesters.splice(index, 1);
        setSemesters(newSemesters);
    };

    const handleClearAll = () => {
        setSemesters([]);
    };

    const handleSubmit = () => {
        setSemesters([
            ...semesters,
            { season: selectedSeason, year: selectedYear }
        ]);
        setShowModal(false);
    };

    return (
        <div>
            {semesters.map((semester, index) => (
                <div key={index}>
                    <h3>
                        {semester.season} {semester.year}
                    </h3>
                    <button onClick={() => handleDeleteSemester(index)}>
                        Delete
                    </button>
                </div>
            ))}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Semester</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Season</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedSeason}
                                onChange={(e) =>
                                    setSelectedSeason(e.target.value as Season)
                                }
                            >
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedYear}
                                onChange={(e) =>
                                    setSelectedYear(Number(e.target.value))
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>

            <button onClick={handleAddSemester}>Add Semester</button>
            <button onClick={handleClearAll}>Clear All</button>
        </div>
    );
};

export default SemesterDisplay;
