/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { AddtoSemester } from "./AddtoSemester";
import EditCourse from "./EditCourse";
import { DegreePlan } from "../interfaces/degreePlan";
import { Season, Semester } from "../interfaces/semester";
// import AddCourseToDegreePlanModal from "./AddCourseToDegreePlanModal";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import udlogo3 from "../pictures/udlogo3.png";
// Search course bar (switch 2)
interface SearchProps {
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
    ModifiedCourseList: Course[];
    semesters: Semester[];
    setSemester: React.Dispatch<React.SetStateAction<Semester[]>>;
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    setDisplayEmpty: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDegreePlan: DegreePlan;
    setselectedDegreePlan: React.Dispatch<React.SetStateAction<DegreePlan>>;
    setIsCoursePool: React.Dispatch<React.SetStateAction<boolean>>;
    coursePool: Course[];
    setCoursePool: React.Dispatch<React.SetStateAction<Course[]>>;
    isAddedCourseTopool: boolean;
    setIsAddedCourseTopool: React.Dispatch<React.SetStateAction<boolean>>;
    theCourse: Course;
    isCourseToDegreePlanOpen: boolean;
    setisCourseToDegreePlanOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsdegreeList: React.Dispatch<React.SetStateAction<boolean>>;
}
const Search = ({
    listCourses,
    setListCourses,
    ModifiedCourseList,
    semesters,
    setSemester,
    degreeList,
    setDegreeList,
    setDisplayEmpty,
    selectedDegreePlan,
    setselectedDegreePlan,
    setIsCoursePool,
    coursePool,
    setCoursePool,
    isAddedCourseTopool,
    setIsAddedCourseTopool,
    theCourse,
    isCourseToDegreePlanOpen,
    setisCourseToDegreePlanOpen
}: SearchProps) => {
    const [text, setText] = useState<string>("");
    const [courseIndex, setcourseIndex] = useState<number>(0);
    const [isAddSemesterOpen, SetAddSemester] = useState(false);
    const [ErrorMessage, setError] = useState(false);
    const [ErrorMessage2, setError2] = useState(false);
    const [isCourseBar, setCourseBar] = useState(false);
    const [isEditCourseOpen, setEditCourseOpen] = useState(false);
    const [filterCourses, setfilterCourses] = useState<Course[]>();
    const [isDropdown, setDropDown] = useState(false);
    const [countTool, setCount] = useState(0);
    const handleSearch = (text: string) => {
        const upperText = text.toUpperCase();
        const CourseIndex = ModifiedCourseList.findIndex(
            (course) => upperText === course.code
        );
        if (CourseIndex === -1) {
            setError2(true);
        } else {
            setcourseIndex(CourseIndex);
            setCourseBar(true);
            setError2(false);
            setDropDown(false);
        }
        setCount(0);
        setIsCoursePool(true);
        setIsAddedCourseTopool(false);
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

    const closeEditCourse = () => {
        setEditCourseOpen(false);
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
        // setIsdegreeList(true);
        setCourseBar(false);
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
        }
        setIsAddedCourseTopool(true);
    };

    //setlect credits for course
    // add course from course pool into degree plan modal 1

    const [DegreeName, setDegreeName] = useState<string>("");

    const [IsSelectedRepeatedCourse, setIsSelectedRepeatedCourse] =
        useState(false);
    const handleAddCourseToDegreePlanClick1 = () => {
        //click next button in modal 1 of courses pool
        setIsRenderSelectedDegreeplan(false);
        const repeatedCourse = selectedDegreePlan.semesters.filter((semester) =>
            semester.courses.includes(theCourse)
        );
        if (repeatedCourse.length === 0) {
            setIsAddCourseToSemesterOpen(true);
            setisCourseToDegreePlanOpen(false);
        } else {
            setIsSelectedRepeatedCourse(true);
        }
        // console.log(IsSelectedRepeatedCourse);
    };
    const handleCLickDegreePlan = (degreePlan: DegreePlan) => {
        // click degre plan in modal 1
        setDegreeName(degreePlan.name);
        setIsRenderSelectedDegreeplan(true);
        setselectedDegreePlan(degreePlan);
        setIsSelectedRepeatedCourse(false);

        setDegreelistLength(() => {
            const listLength = degreePlan.semesters.length;
            return listLength;
        });
    };
    const [IsRenderSelectedDegreeplan, setIsRenderSelectedDegreeplan] =
        useState(false);
    const FunctionSetisCourseToDegreePlanOpen = () => {
        setisCourseToDegreePlanOpen(false);
        setIsSelectedRepeatedCourse(false);
    };
    // add course from course pool into degree plan modal 2
    const [IsAddCourseToSemesterOpen, setIsAddCourseToSemesterOpen] =
        useState(false);
    const handleCLickAddCourseToDegreePlanSave = () => {
        // save button
        setIsAddCourseToSemesterOpen(false);
        setIsRenderSelctedSemester(false);
        setDisplayEmpty(true);
        const semesterIndex = selectedDegreePlan.semesters.findIndex(
            (theSemester) => theSemester === renderSelectedSemester
        );
        const DegreePlanIndex = degreeList.findIndex(
            (degreeplan) => degreeplan === selectedDegreePlan
        );
        const update = [...degreeList];
        update[DegreePlanIndex].semesters[semesterIndex].courses.push(
            theCourse
        );
        setDegreeList(update);
    };
    const [renderSelectedSemester, setRenderSelectedSemester] =
        useState<Semester>({
            year: 2023,
            season: "fall" as Season,
            courses: []
        });
    const handleClickSemesterInCoursePoolModal2 = (semester: Semester) => {
        setRenderSelectedSemester(semester);
        setIsRenderSelctedSemester(true);
    };
    const HandleBack = () => {
        setIsAddCourseToSemesterOpen(false);
        setisCourseToDegreePlanOpen(true);
        setIsRenderSelctedSemester(false);
    };
    const [degreeListLength, setDegreelistLength] = useState(0);
    const [IsRenderSelctedSemester, setIsRenderSelctedSemester] =
        useState(false);
    return (
        <div className="searchview">
            <div className="classgo-view" />
            <img
                src={udlogo3}
                style={{
                    maxWidth: "40%",
                    height: "auto",
                    marginRight: "20px"
                }}
            />

            <div>
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
            <br />
            {isCourseBar && (
                <div className="courseBar_box">
                    <div className="DegreeListTitle-view">
                        {"Course Information"}
                    </div>
                    <br />
                    <br />
                    <div>
                        {"Course Code: "}
                        <></>
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
                    <br />
                    <br />

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
                                <br />
                                <br />
                                <div className="addedCourseTopoolPropmt">
                                    {isAddedCourseTopool &&
                                        "You have already added it to the pool of courses"}
                                </div>
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
            {isCourseToDegreePlanOpen && ( //Add course from pool of courses to degree plan modal 1
                <Modal show={true} onHide={FunctionSetisCourseToDegreePlanOpen}>
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
                                    {degreeList.length > 0 ? (
                                        degreeList.map((degreePlan) => (
                                            <button
                                                className="eachCourseButton"
                                                value={degreePlan.name}
                                                key={
                                                    degreePlan.name +
                                                    degreePlan.concentration
                                                }
                                                onClick={() =>
                                                    handleCLickDegreePlan(
                                                        degreePlan
                                                    )
                                                }
                                            >
                                                {degreePlan.name}
                                            </button>
                                        ))
                                    ) : (
                                        <div>
                                            {"Please add a degree plan first!"}
                                        </div>
                                    )}
                                    {IsRenderSelectedDegreeplan && (
                                        <div>
                                            {"You just selected: "} {DegreeName}
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {IsSelectedRepeatedCourse && (
                            <div className="warning-view">
                                {
                                    "You already added this course for this degreeplan, please pick another one!"
                                }
                            </div>
                        )}
                        <Button onClick={handleAddCourseToDegreePlanClick1}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {IsAddCourseToSemesterOpen && (
                <Modal
                    show={true}
                    onHide={() => setIsAddCourseToSemesterOpen(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Choose One Semester for {DegreeName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {degreeListLength > 0 ? (
                            <div>
                                <div>
                                    You will add {theCourse.code + " "} into{" "}
                                    {DegreeName + " "}
                                </div>
                                {selectedDegreePlan.semesters.map(
                                    (semester) => (
                                        <div
                                            key={
                                                semester.year + semester.season
                                            }
                                        >
                                            <button
                                                onClick={() =>
                                                    handleClickSemesterInCoursePoolModal2(
                                                        semester
                                                    )
                                                }
                                                className="eachCourseButton"
                                            >
                                                {semester.year +
                                                    " " +
                                                    semester.season}
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="warning-view">
                                Please add at least one semester before you
                                adding course into this degree plan!
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {IsRenderSelctedSemester && (
                            <div>
                                {"You just selected: "}
                                {renderSelectedSemester.year +
                                    " " +
                                    renderSelectedSemester.season}
                            </div>
                        )}
                        <Button variant="secondary" onClick={HandleBack}>
                            Back
                        </Button>
                        {degreeListLength ? (
                            <Button
                                variant="primary"
                                onClick={handleCLickAddCourseToDegreePlanSave}
                            >
                                Save
                            </Button>
                        ) : null}
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
export default Search;
