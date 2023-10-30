import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseEdit } from "./CourseEdit";

import "./SemesterEdit.css";

export const SemesterEdit = ({
    semester,
    editSemester,
    deleteSemester,
    switchEdit,
    resetView
}: {
    semester: Semester;
    editSemester: (SemesterCode: string, newSemester: Semester) => void;
    deleteSemester: (SemesterCode: string) => void;
    switchEdit: () => void;
    resetView: () => void;
}) => {
    const [newSemester, setNewSemester] = useState<Semester>({ ...Semester });

    const editCourse = (CourseId: string, newCourse: Course) => {
        setNewSemester({
            ...newSemester,
            CourseList: newSemester.CourseList.map(
                (Course: Course): Course =>
                    Course.id === CourseId ? newCourse : Course
            )
        });
    };

    const removeCourse = (CourseId: number) => {
        setNewSemester({
            ...newSemester,
            CourseList: newSemester.CourseList.filter(
                (Course: Course): boolean => Course.id !== CourseId
            )
        });
    };

    const saveChanges = () => {
        editSemester(Semester.id, { ...newSemester });
    };
    /* COME BACK AND TAKE A LOOK COME BACK AND TAKE A LOOK COME BACK AND TAKE A LOOK COME BACK AND TAKE A LOOK COME BACK AND TAKE A LOOK*/
    const swapCourse = (idx1: number, idx2: number) => {
        setNewSemester({
            ...newSemester,
            CourseList: newSemester.CourseList.map(
                (q: Course, idx: number): Course => {
                    if (idx === idx1) return newSemester.CourseList[idx2];
                    if (idx === idx2) return newSemester.CourseList[idx1];
                    return newSemester.CourseList[idx];
                }
            )
        });
    };

    return (
        <div>
            <div className="edit_header">
                <Form.Group controlId="formEditSemesterId">
                    <div className="title_published_flex">
                        <div className="edit_title_area">
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                value={newSemester.title}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setNewSemester({
                                        ...newSemester,
                                        title: e.target.value
                                    })
                                }
                            ></Form.Control>
                        </div>
                        <Form.Check
                            className="published_check"
                            type="checkbox"
                            id="is-published_check"
                            label="Semester Published"
                            data-testid="Semester Published"
                            checked={newSemester.published}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewSemester({
                                    ...newSemester,
                                    published: !newSemester.published
                                });
                            }}
                        ></Form.Check>
                    </div>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newSemester.body}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewSemester({
                                ...newSemester,
                                body: e.target.value
                            })
                        }
                    ></Form.Control>
                </Form.Group>
            </div>

            <div>
                {newSemester.CourseList.map((q: Course, index: number) => (
                    <CourseEdit
                        key={newSemester.id + "|" + q.id}
                        index={index}
                        lastIndex={newSemester.CourseList.length - 1}
                        Course={q}
                        editCourse={editCourse}
                        removeCourse={removeCourse}
                        swapCourse={swapCourse}
                    ></CourseEdit>
                ))}
            </div>
            <hr />
            <div>
                <Button
                    className="add_Course_button"
                    onClick={() => {
                        setNewSemester({
                            ...newSemester,
                            CourseList: [
                                ...newSemester.CourseList,
                                {
                                    id: newSemester.CourseList.length,
                                    body: "Example Course",
                                    type: "short_answer_Course",
                                    options: [],
                                    submission: "",
                                    expected: "Example Answer",
                                    points: 1,
                                    published: false
                                }
                            ]
                        });
                    }}
                >
                    Add Course
                </Button>
                <div className="edit_footer">
                    <div>
                        <Button
                            variant="success"
                            className="save_edit_btn"
                            onClick={() => {
                                saveChanges();
                                switchEdit();
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="warning" onClick={switchEdit}>
                            Cancel
                        </Button>
                    </div>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteSemester(Semester.id);
                            resetView();
                        }}
                    >
                        Delete Semester
                    </Button>
                </div>
            </div>
        </div>
    );
};
