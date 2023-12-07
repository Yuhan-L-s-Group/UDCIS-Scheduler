/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreePlan";
import { Season, Semester } from "../interfaces/semester";
// import AddCourseToDegreePlanModal from "./AddCourseToDegreePlanModal";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import udlogo3 from "../pictures/udlogo3.png";
// Search course bar (switch 2)
interface SearchProps {
    setListCourses: (courses: Course[]) => void;
    ModifiedCourseList: Course[];
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    setDisplayEmpty: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDegreePlan: DegreePlan;
    setselectedDegreePlan: React.Dispatch<React.SetStateAction<DegreePlan>>;
    setIsAddedCourseTopool: React.Dispatch<React.SetStateAction<boolean>>;
    theCourse: Course;
    isCourseToDegreePlanOpen: boolean;
    setisCourseToDegreePlanOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsdegreeList: React.Dispatch<React.SetStateAction<boolean>>;
    setCourseBar: React.Dispatch<React.SetStateAction<boolean>>;
    setcourseIndex: React.Dispatch<React.SetStateAction<number>>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
    text: string;
    setIsRenderPoolOfCourse: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCourseInfo: React.Dispatch<React.SetStateAction<boolean>>;
    setCoursePool: React.Dispatch<React.SetStateAction<Course[]>>;
    coursePool: Course[];
}
const Search = ({
    ModifiedCourseList,
    degreeList,
    setDegreeList,
    setDisplayEmpty,
    selectedDegreePlan,
    setselectedDegreePlan,
    setIsAddedCourseTopool,
    theCourse,
    isCourseToDegreePlanOpen,
    setisCourseToDegreePlanOpen,
    setCourseBar,
    setcourseIndex,
    setCount,
    setText,
    text,
    setIsRenderPoolOfCourse,
    setIsCourseInfo,
    setCoursePool,
    coursePool
}: SearchProps) => {
    const [ErrorMessage2, setError2] = useState(false);
    const [filterCourses, setfilterCourses] = useState<Course[]>();
    const [isDropdown, setDropDown] = useState(false);
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
        setIsAddedCourseTopool(false);
        setIsRenderPoolOfCourse(true);
        setIsCourseInfo(true);
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
        setIsRenderPoolOfCourse(false);
    };
    //click course in the dropdown menu
    const handleClickCourse = (course: Course) => {
        setText(course.code);
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
        const CourseIndexInPool = coursePool.findIndex((c) => c === theCourse);
        coursePool.splice(CourseIndexInPool, 1);
        const update2 = [...coursePool];
        setCoursePool(update2);
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
            {IsAddCourseToSemesterOpen && ( // after you click next from modal 1, this modal will pop up
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
                                            <br />
                                            <br />
                                            <div className="prerequiste-view">
                                                {"PREREQ: "}
                                                {theCourse.preReq}
                                            </div>
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
