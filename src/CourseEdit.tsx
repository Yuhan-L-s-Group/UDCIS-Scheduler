import React from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "./interfaces/course";

import "./courseEdit.css";

export const courseEdit = ({
    index,
    lastIndex,
    course,
    editcourse,
    removecourse,
    swapcourse
}: {
    index: number;
    lastIndex: number;
    course: Course;
    editcourse: (courseCode: string, course: Course) => void;
    removecourse: (courseCode: string) => void;
    swapcourse: (target1: number, target2: number) => void;
}) => {
    /*
    const [a, b] = useState<number>(
        course.options.findIndex((s: string) => course.expected === s)
    ); */

    return (
        <>
            <hr />
            <div className="edit_course">
                <div className="edit_title_row">
                    <div className="edit_title_box">
                        <h4>{index + 1}. </h4>
                        <Form.Group
                            className="title_input"
                            controlId="editTitleFormId"
                        >
                            <Form.Control
                                value={course.body}
                                data-testid="edit_course_title"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    editcourse(course.id, {
                                        ...course,
                                        body: e.target.value
                                    });
                                }}
                            ></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className="swap_button_container">
                    <Button
                        disabled={index === 0}
                        className="swap_button"
                        onClick={() => {
                            swapcourse(index, index - 1);
                        }}
                    >
                        ▲
                    </Button>
                    <Button
                        disabled={index === lastIndex}
                        className="swap_button"
                        onClick={() => {
                            swapcourse(index, index + 1);
                        }}
                    >
                        ▼
                    </Button>
                </div>
            </div>
            <div className="edit_course_footer">
                <Form.Check
                    className="published_course_check"
                    data-testid="course_published_check"
                    type="checkbox"
                    id="is_course_published_check"
                    label="Published"
                    checked={course.published}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        editcourse(course.id, {
                            ...course,
                            published: e.target.checked
                        });
                    }}
                ></Form.Check>
                <Button
                    variant="danger"
                    onClick={() => {
                        removecourse(course.id);
                    }}
                >
                    Delete
                </Button>
            </div>
        </>
    );
};
