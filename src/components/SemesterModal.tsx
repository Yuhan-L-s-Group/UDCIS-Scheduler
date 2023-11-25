/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button, Modal, Col, Form, Container, Row } from "react-bootstrap";
import { Season, Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";
//The adding semester modal when user clicks add new semester it pops up
export const SemesterModal = ({
    showAddSemester,
    handleClose,
    semesters,
    SelecetedEditdDegreePlan,
    degreeList,
    setDegreeList,
    modifysemster
}: {
    showAddSemester: boolean;
    handleClose: () => void;
    semesters: Semester[];
    SelecetedEditdDegreePlan: DegreePlan;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    modifysemster: (semester: Semester[]) => void;
}) => {
    const [year, setYear] = useState<number>(2023);
    const [season, setSeason] = useState<Season>("Fall");
    const [warn, setWarn] = useState<string>("");
    const years = Array.from(Array(30).keys()).map((x) => x + 2018);
    // const [newSemester, setNewSemester] = useState({
    //     year: 2023,
    //     season: "fall" as Season,
    //     courses: []
    // });
    const newSemester: Semester = {
        year: year,
        season: season,
        courses: []
    };
    const saveChanges = (): void => {
        if (
            semesters.filter((s) => s.season === season && s.year === year)
                .length > 0
        ) {
            setWarn("Semester already in your plan!");
        } else {
            handleClose();

            newSemester.year = year;
            newSemester.season = season;
            const update = [...degreeList];
            const findIndex = degreeList.findIndex(
                (degreePlan) => degreePlan === SelecetedEditdDegreePlan
            );
            degreeList[findIndex].semesters.push(newSemester);
            setDegreeList(update);
            const updatedSemesters = [...SelecetedEditdDegreePlan.semesters];
            modifysemster(updatedSemesters);
        }
        console.log(semesters);
        console.log(degreeList);
    };

    function updateSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        setSeason(event.target.value as Season);
    }

    function updateYear(event: React.ChangeEvent<HTMLSelectElement>) {
        setYear(parseInt(event.target.value));
    }

    return (
        <div>
            <Modal
                show={showAddSemester}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Semester</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="Add-Semesters">
                        <Container>
                            <Row>
                                <Col id="add-season-col">
                                    <Form.Label>Season: </Form.Label>
                                    <Form.Select
                                        value={season}
                                        onChange={updateSeason}
                                    >
                                        <option value="Fall">Fall</option>
                                        <option value="Winter">Winter</option>
                                        <option value="Spring">Spring</option>
                                        <option value="Summer">Summer</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Year: </Form.Label>
                                    <Form.Select
                                        value={year}
                                        onChange={updateYear}
                                    >
                                        {years.map((year: number) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <p id="alert">{warn}</p>
                            </Row>
                        </Container>
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
