/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import courses from "../data/CourseList.json";
import { Semester } from "../interfaces/semester";
import { AddtoSemester } from "./AddtoSemester";
import EditCourse from "./EditCourse";
import { AddCourse } from "./AddCourse";
import { Concentration, DegreePlan } from "../interfaces/degreePlan";
// import AddCourseToDegreePlanModal from "./AddCourseToDegreePlanModal";
import { Button, Modal, Col, Form, Container, Row } from "react-bootstrap";

// Search course bar (switch 2)
interface SearchProps {
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    ModifiedCourseList: Course[];
    semesters: Semester[];
    setSemester: React.Dispatch<React.SetStateAction<Semester[]>>;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
}
const Search = ({
    listCourses,
    setListCourses,
    ModifiedCourseList,
    semesters,
    setSemester,
    degreeList
}: SearchProps) => {
    const [text, setText] = useState<string>("");
    const [courseIndex, setcourseIndex] = useState<number>(0);
    const [isAddSemesterOpen, SetAddSemester] = useState(false);
    const [ErrorMessage, setError] = useState(false);
    const [ErrorMessage2, setError2] = useState(false);
    const [isCourseBar, setCourseBar] = useState(false);
    const [isEditCourseOpen, setEditCourseOpen] = useState(false);
    const [isAddCourseOpen, setAddCourseOpen] = useState(false);
    const [filterCourses, setfilterCourses] = useState<Course[]>();
    const [isDropdown, setDropDown] = useState(false);
    const [countTool, setCount] = useState(0);
    const [coursePool, setCoursePool] = useState<Course[]>([]);
    const [isCoursePool, setIsCoursePool] = useState(false);
    const handleSearch = (text: string) => {
        const upperText = text.toUpperCase();
        const CourseIndex = ModifiedCourseList.findIndex(
            (course) => upperText === course.code
        );
        if (CourseIndex === -1) {
            setError2(true);
        } else {
            setcourseIndex(CourseIndex);
            // console.log(courses[CourseIndex]);
            setCourseBar(true);
            setError2(false);
            setDropDown(false);
        }
        setCount(0);
        setIsCoursePool(true);
    };
    const [selectedCourse, setselectedCourse] = useState<Course>({
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    });
    const closeAddSemester = () => {
        SetAddSemester(false);
    };
    const CloseError = () => {
        setError(false);
    };
    //handle click edit course
    const gotYouCourse = (text: string) => {
        const upperText = text.toUpperCase();
        if (countTool === 0) {
            const indexCourse = ModifiedCourseList.findIndex(
                (course) => upperText === course.code
            );
            setselectedCourse(ModifiedCourseList[indexCourse]);
        } else {
            const indexCourse = ModifiedCourseList.findIndex(
                (course) => listCourses[courseIndex].code === course.code
            );
            setselectedCourse(ModifiedCourseList[indexCourse]);
        }
        setEditCourseOpen(true);
        setCount(1);
    };
    const gotYouCourse2 = (course: Course) => {
        setselectedCourse(course);
        SetAddSemester(true);
    };
    const handleAddCourseToSemester = (text: string) => {
        const upperText = text.toUpperCase();
        if (countTool === 0) {
            const indexCourse = ModifiedCourseList.findIndex(
                (course) => upperText === course.code
            );
            const repeatedCourse = semesters.filter((semester) =>
                semester.courses.includes(ModifiedCourseList[indexCourse])
            );

            if (repeatedCourse.length !== 0) {
                setError(true);
            } else {
                gotYouCourse2(ModifiedCourseList[indexCourse]);
            }
        } else {
            const indexCourse = ModifiedCourseList.findIndex(
                (course) => listCourses[courseIndex].code === course.code
            );
            const repeatedCourse = semesters.filter((semester) =>
                semester.courses.includes(ModifiedCourseList[indexCourse])
            );
            if (repeatedCourse.length !== 0) {
                setError(true);
            } else {
                gotYouCourse2(ModifiedCourseList[indexCourse]);
            }
            console.log(ModifiedCourseList[indexCourse]);
        }
        console.log(ModifiedCourseList);

        // console.log(indexCourse);
    };
    const closeEditCourse = () => {
        setEditCourseOpen(false);
    };

    const openAddCourseWindow = () => {
        setAddCourseOpen(true);
    };

    const closeAddCourseWindow = () => {
        setAddCourseOpen(false);
    };
    //filter the course user type in
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const theText = e.target.value;
        const trimmedText = theText.trim();
        const upperText = trimmedText.toUpperCase();
        setText(upperText);
        const filteritems = ModifiedCourseList.filter((course) =>
            course.code.includes(upperText)
        );
        setfilterCourses(filteritems);
        setDropDown(true);
    };
    //click course in the dropdown menu
    const handleClickCourse = (course: Course) => {
        setText(course.code);
    };
    // add courses from course bar into courses pool
    const handleClickPool = () => {
        const update = [...coursePool];
        const indexCourse = ModifiedCourseList.findIndex(
            (course) => listCourses[courseIndex].code === course.code
        );
        const repeatedCourse = coursePool.includes(listCourses[courseIndex]);
        if (!repeatedCourse) {
            update.push(ModifiedCourseList[indexCourse]);
            setCoursePool(update);
            console.log(update);
        }
        console.log(listCourses[courseIndex].code);
    };
    //delete courses from courses pool
    const deletePool = (deleteCourse: Course) => {
        const indexCourse = coursePool.findIndex(
            (course) => deleteCourse.code === course.code
        );
        coursePool.splice(indexCourse, 1);
        const update = [...coursePool];
        setCoursePool(update);
    };
    // add course from course pool into degree plan

    const [isCourseToDegreePlanOpen, setisCourseToDegreePlanOpen] =
        useState(false);
    const [theCourse, setTheCourse] = useState({
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    });
    //course the user selected from courses pool for adding to degree plan
    const AddCourseToDegreePlan = (course: Course) => {
        setTheCourse(course);
        setisCourseToDegreePlanOpen(true);
    };
    const [selectedDegreePlan, setselectedDegreePlan] = useState<DegreePlan>({
        name: degreeList.length === 1 ? degreeList[0].name : "",
        concentration: "" as Concentration,
        semesters: []
    });
    const [DegreeName, setDegreeName] = useState<string>("");
    const [IsAddCourseToSemester2Open, setIsAddCourseToSemester2Open] =
        useState(false);
    const ONchangeDegreeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        degreeList.length === 1
            ? setDegreeName(degreeList[0].name)
            : setDegreeName(e.target.value);
    };
    const handleAddCourseToDegreePlanClick1 = () => {
        setIsAddCourseToSemester2Open(true);
        setisCourseToDegreePlanOpen(false);
        // const findDegreePlan = degreeList.find(
        //     (degreePlan) => degreePlan.name === DegreeName
        // );
        console.log(degreeList.length);
        console.log(DegreeName);
        // console.log(degreeList[0].name);
    };
    return (
        <div className="WholeSearch">
            <div
                style={{
                    display: "flex",
                    marginLeft: "100px"
                }}
            >
                <input
                    type="text"
                    pattern="Course Code"
                    value={text}
                    onChange={handleInputChange}
                    placeholder={"Type to Search"}
                    className="searchInput"
                />
                <button
                    onClick={() => handleSearch(text)}
                    className="searchBar"
                >
                    Search
                </button>
            </div>
            {isDropdown && (
                <div className="searchMenu">
                    {filterCourses?.map(
                        //iterate each course in the filter course list and display in the drop down menu
                        (course) => (
                            <div
                                key={course.code}
                                className="eachCourseinDropDown"
                            >
                                <button
                                    onClick={() => handleClickCourse(course)}
                                    className="eachCourseButton"
                                >
                                    {" "}
                                    {course.code}
                                    {"-"}
                                    {course.name}{" "}
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}
            {ErrorMessage2 && ( //error message pops up when user does not search the correct course code
                <div>Please make sure the course code is correct!</div>
            )}
            <br />
            {
                <div>
                    {" "}
                    <Button
                        onClick={openAddCourseWindow}
                        className="addcourseView"
                    >
                        Add Course to Course List
                    </Button>
                </div>
            }
            {isAddCourseOpen && ( // create new course button
                <div>
                    <AddCourse
                        onClose={closeAddCourseWindow}
                        listCourses={listCourses}
                        setListCourses={setListCourses}
                    />
                </div>
            )}
            <br />
            {isCourseBar && (
                <div className="courseBar_box">
                    <div>
                        {"Course Code: "}
                        {listCourses[courseIndex].code}
                    </div>
                    <br />

                    <div>
                        {" "}
                        {"Course Name: "}
                        {listCourses[courseIndex].name}
                    </div>
                    <br />
                    <div>
                        {" "}
                        {"Course Credits: "}
                        {listCourses[courseIndex].credits}
                    </div>
                    <br />
                    <div>
                        {" "}
                        {"Course description: "}
                        {listCourses[courseIndex].descr}
                    </div>
                    <br />
                    <Button variant="success" onClick={handleClickPool}>
                        Add to Course Pool
                    </Button>
                    <div>
                        {isAddSemesterOpen ? ( // add course to semester list
                            <div>
                                <AddtoSemester
                                    selectedCourse={selectedCourse}
                                    closeAddSemester={closeAddSemester}
                                    semesters={semesters}
                                    setSemester={setSemester}
                                />
                            </div>
                        ) : (
                            <div>
                                <span>
                                    {" "}
                                    <Button onClick={() => gotYouCourse(text)}>
                                        {" "}
                                        Edit
                                    </Button>
                                </span>
                                {isEditCourseOpen && ( // edit course
                                    <>
                                        <div className="editButtonInSwitch">
                                            <EditCourse
                                                listCourses={listCourses}
                                                setListCourses={setListCourses}
                                                closeEditCourse={
                                                    closeEditCourse
                                                }
                                                CourseSlected={selectedCourse}
                                                ModifiedCourseList={
                                                    ModifiedCourseList
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                                {ErrorMessage && ( // error message when user trys to add the course which has already been selceted into the semester list
                                    <Modal show={true} onHide={CloseError}>
                                        <Modal.Header closeButton>
                                            <Modal.Title className="modifyErrorTitle">
                                                Wrong Selection
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            You have already selected this
                                            course. Please make sure you do not
                                            select the same course.
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="secondary"
                                                onClick={CloseError}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isCourseToDegreePlanOpen && (
                <Modal
                    show={true}
                    onHide={() => setisCourseToDegreePlanOpen(false)}
                >
                    {" "}
                    <Modal.Header closeButton>
                        {" "}
                        <Modal.Title>Add Course to Degree Plan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="Add-Course-To-Degree-Plan">
                            {" "}
                            <Row>
                                <Col>
                                    <Form.Label>Plan: </Form.Label>
                                    <Form.Select
                                        key={DegreeName}
                                        value={DegreeName}
                                        onChange={ONchangeDegreeName}
                                    >
                                        {degreeList.map((degreePlan) => (
                                            <option
                                                value={degreePlan.name}
                                                key={
                                                    degreePlan.name +
                                                    degreePlan.concentration
                                                }
                                            >
                                                {degreePlan.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {" "}
                        <Button onClick={handleAddCourseToDegreePlanClick1}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {}
            {isCoursePool && (
                <div className="coursePool_box">
                    <span className="Pool_Titile">{"Pool of Courses"}</span>
                    <table>
                        <thead>
                            {" "}
                            <tr>
                                <th> Course Code</th>
                                <th> Course Credits</th>
                                <th> Delete</th>
                                <th> Add to Degree Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursePool.map((course) => (
                                <tr key={course.code}>
                                    {" "}
                                    <td>{course.code}</td>
                                    <td>{course.credits}</td>
                                    <td>
                                        {" "}
                                        <Button
                                            variant="danger"
                                            onClick={() => deletePool(course)}
                                        >
                                            X
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() =>
                                                AddCourseToDegreePlan(course)
                                            }
                                        >
                                            Add to Degree Plan
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default Search;
