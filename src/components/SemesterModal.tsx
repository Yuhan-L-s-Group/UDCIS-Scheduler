import React, { useState } from "react";
import { Button, Modal, Col, Form } from "react-bootstrap";
import { Season, Semester } from "../interfaces/semester";

export const AddSemesterModal = ({
    show,
    handleClose,
    addSemester
}: {
    show: boolean;
    handleClose: () => void;
    addSemester: (year: number, season: Season) => void;
}) => {
    const [year, setYear] = useState<number>(2023);
    const [season, setSeason] = useState<Season>("Fall");
    const [warn, setWarn] = useState<string>("");
    const years = Array.from(Array(30).keys()).map((x) => x + 2018);

    const saveChanges = (): void => {
        addSemester(year, season);
        setYear(2023);
        setSeason("Fall");
        handleClose();
    };

    function updateSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        setSeason(event.target.value as Season);
    }

    function updateYear(event: React.ChangeEvent<HTMLSelectElement>) {
        setYear(parseInt(event.target.value));
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Semester</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="Add-Semesters">
                        <Col id="add-season-col">
                            <Form.Label>Season: </Form.Label>
                            <Form.Select value={season} onChange={updateSeason}>
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Winter">Winter</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Year: </Form.Label>
                            <Form.Select value={year} onChange={updateYear}>
                                {years.map((year: number) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setYear(2023);
                            setSeason("Fall");
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
