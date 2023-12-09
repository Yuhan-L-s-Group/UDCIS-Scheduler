/* eslint-disable no-extra-parens */
// eslint conflict with prettier
import React, { useState } from "react";
import { Course } from "../interfaces/course";
import "../App.css";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";
import { Button } from "react-bootstrap";

// Display each individual semester
// Addtionally it automatically caculates the each semester credits
export const SemesterDisplay = ({
    semester,
    modifysemster,
    semesters,
    degreeList,
    setDegreeList,
    SelecetedEditdDegreePlan,
    setCoursePool,
    coursePool,
    DragCouse,
    setDragCouse
}: {
    semester: Semester;
    modifysemster: (semester: Semester[]) => void;
    semesters: Semester[];
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    SelecetedEditdDegreePlan: DegreePlan;
    setCoursePool: React.Dispatch<React.SetStateAction<Course[]>>;
    coursePool: Course[];
    DragCouse: Course;
    setDragCouse: React.Dispatch<React.SetStateAction<Course>>;
}): JSX.Element => {
    const deleteCourseFunc = (course: Course) => {
        // delete a course from a semester
        // const findDegreeIndex = degreeList.findIndex(
        //     (degreeplan) => degreeplan === SelecetedEditdDegreePlan
        // );
        // const findSemesterIndex = SelecetedEditdDegreePlan.semesters.findIndex(
        //     (s) => s.courses.includes(course)
        // );
        // const findCourseIndex = SelecetedEditdDegreePlan.semesters[
        //     findSemesterIndex
        // ].courses.findIndex((c) => c === course);
        // degreeList[findDegreeIndex].semesters[findSemesterIndex].courses.splice(
        //     findCourseIndex,
        //     1
        // );
        // const update = [...degreeList];
        // setDegreeList(update);
        // semesters[findSemesterIndex].courses.splice(findCourseIndex, 1);
        // const update2 = [...semesters];
        // modifysemster(update2);
        console.log(degreeList);
    };

    const deleteWholeSemester = () => {
        //delete everything of a single semester from semester list
        const findDegreeIndex = degreeList.findIndex(
            (degreeplan) => degreeplan === SelecetedEditdDegreePlan
        );
        const findSemesterIndex = SelecetedEditdDegreePlan.semesters.findIndex(
            (s) => s === semester
        );
        degreeList[findDegreeIndex].semesters.splice(findSemesterIndex, 1);
        const update = [...degreeList];
        setDegreeList(update);
        semesters.splice(findSemesterIndex, 1);
        const update2 = [...semesters];
        modifysemster(update2);
    };
    const emptySemester = () => {
        const findSemesterIndex = semesters.findIndex((s) => s === semester);
        semesters[findSemesterIndex] = {
            ...semesters[findSemesterIndex],
            courses: []
        };
        modifysemster(semesters);
        const findDegreeIndex = degreeList.findIndex(
            (degree) => degree.name === SelecetedEditdDegreePlan.name
        );
        degreeList[findDegreeIndex].semesters[findSemesterIndex].courses = [];
        const update = [...degreeList];
        setDegreeList(update);
        console.log(SelecetedEditdDegreePlan);
    };
    //handle move course to other semester function
    const handleCourseMove = (course: Course, targetSemesterId: string) => {
        const updatedSemesters = semesters.map((s) => {
            if (s.season + s.year === targetSemesterId) {
                // find the semester where user wants to move the course to
                if (!s.courses.find((c) => c.code === course.code)) {
                    //make a condition that the target semester does not have repeated course
                    const findCourseIndex = s.courses.findIndex(
                        (thecourse) => thecourse === course
                    ); //find the course index before user move to target semester, so after move out, the original course will be deleted from its semester
                    const findOriginalSemesterIndex = semesters.findIndex(
                        (thesemester) => thesemester.courses.includes(course)
                    ); //find the semester index before move out, same with the last step
                    const findSemesterIndex =
                        SelecetedEditdDegreePlan.semesters.findIndex(
                            (s) => s.season + s.year === targetSemesterId
                        ); //find the target semester index
                    const findDegreeIndex = degreeList.findIndex(
                        (degree) =>
                            degree.name === SelecetedEditdDegreePlan.name
                    );
                    degreeList[findDegreeIndex].semesters[findSemesterIndex] = {
                        ...s,
                        courses: [...s.courses, course]
                    };
                    degreeList[findDegreeIndex].semesters[
                        findOriginalSemesterIndex
                    ].courses.splice(findCourseIndex, 1);
                    const update = [...degreeList];
                    setDegreeList(update);
                    return {
                        ...s,
                        courses: [...s.courses, course]
                    };
                }
            } else if (s.courses.find((c) => c.code === course.code)) {
                return {
                    ...s,
                    courses: s.courses.filter((c) => c.code !== course.code)
                };
            }
            return s;
        });
        modifysemster(updatedSemesters);
    };
    //handle the course from seemster list to pool of courses

    const handleCoursetoPool = (course: Course) => {
        const repeatedCourse = coursePool.includes(course);
        if (!repeatedCourse) {
            // add the course from semester to pool
            coursePool.push(course);
            const update = [...coursePool];
            setCoursePool(update);
            //delete the original course from seemster
            const findDegreeIndex = degreeList.findIndex(
                (degreeplan) => degreeplan === SelecetedEditdDegreePlan
            );
            const findSemesterIndex =
                SelecetedEditdDegreePlan.semesters.findIndex((s) =>
                    s.courses.includes(course)
                );
            const findCourseIndex = SelecetedEditdDegreePlan.semesters[
                findSemesterIndex
            ].courses.findIndex((c) => c === course);
            degreeList[findDegreeIndex].semesters[
                findSemesterIndex
            ].courses.splice(findCourseIndex, 1);
            const update2 = [...degreeList];
            setDegreeList(update2);
            semesters[findSemesterIndex].courses.splice(findCourseIndex, 1);
            const update3 = [...semesters];
            modifysemster(update3);
            console.log(findSemesterIndex);
            console.log(findCourseIndex);
            console.log(degreeList);
        }
    };

    const handleDrag = (
        event: React.DragEvent<HTMLTableRowElement>,
        course: Course
    ) => {
        event.preventDefault();
        console.log(course);

        const findSemesterIndex = SelecetedEditdDegreePlan.semesters.findIndex(
            (s) => s.courses.includes(course)
        );
        const findCourseIndex = SelecetedEditdDegreePlan.semesters[
            findSemesterIndex
        ].courses.findIndex((c) => c === course);

        semesters[findSemesterIndex].courses.splice(findCourseIndex, 1);
        const update2 = [...semesters];
        modifysemster(update2);
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(DragCouse);

        const findSemesterIndex = SelecetedEditdDegreePlan.semesters.findIndex(
            (s) => s === semester
        );
        // const findCourseIndex = SelecetedEditdDegreePlan.semesters[
        //     findSemesterIndex
        // ].courses.findIndex((c) => c === DragCouse);
        // degreeList[findDegreeIndex].semesters[findSemesterIndex].courses.push(
        //     DragCouse
        // );
        // const update = [...degreeList];
        // setDegreeList(update);
        semesters[findSemesterIndex].courses.push(DragCouse);
        const update2 = [...semesters];
        modifysemster(update2);
    };
    const handledragover = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    return (
        <div
            className="semester_view"
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handledragover(event)}
        >
            <table>
                <thead>
                    <tr>
                        <th>
                            {semester.season} {semester.year}
                        </th>
                        <th>
                            Total:{" "}
                            {semester.courses.reduce(
                                (acc, iter) => acc + parseInt(iter.credits),
                                0
                            )}
                        </th>
                        <th>Move Course</th>
                        {semester.courses.length !== 0 && (
                            <th>
                                {" "}
                                {
                                    <button
                                        className="emeptySemester"
                                        onClick={emptySemester}
                                    >
                                        Empty
                                    </button>
                                }
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {semester.courses.map((course) => (
                        <tr
                            key={course.code + course.name}
                            draggable={true}
                            onDrag={(e) => handleDrag(e, course)}
                            onDragStart={() => setDragCouse(course)}
                        >
                            <td>
                                {course.code}
                                {" - "}
                                {course.name}
                            </td>
                            <td> {course.credits}</td>
                            <td>
                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        if (selectedValue === course.code) {
                                            handleCoursetoPool(course);
                                        } else {
                                            handleCourseMove(
                                                course,
                                                e.target.value
                                            );
                                        }
                                    }}
                                    style={{
                                        fontSize: "16px", // Adjust the font size as needed
                                        padding: "8px", // Adjust the padding as needed
                                        borderRadius: "6px", // Adjust the border radius as needed
                                        border: "1px solid #ccc" // Add border for a cleaner look
                                    }}
                                >
                                    <option>Move to...</option>
                                    {semesters
                                        .filter((s) => s !== semester)
                                        .map((s) => (
                                            <option
                                                key={s.season + s.year}
                                                value={s.season + s.year}
                                            >
                                                {s.season} {s.year}
                                            </option>
                                        ))}
                                    <option value={course.code}>To Pool</option>
                                </select>
                            </td>
                            <td>
                                {" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteCourseFunc(course)}
                                >
                                    x
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {
                        <tr>
                            <td colSpan={4}>
                                <button
                                    onClick={deleteWholeSemester}
                                    className="deleteEntireSemesterView"
                                >
                                    {" "}
                                    Delete Entire Semester
                                </button>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>{" "}
        </div>
    );
};
