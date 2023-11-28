/* eslint-disable no-extra-parens */
import React from "react";
import { Course } from "../interfaces/course";
import { Button } from "react-bootstrap";
import "../App.css";
import { Season, Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

// Display each individual semester
// Addtionally it automatically caculates the each semester credits
export const SemesterDisplay = ({
    semester,
    modifysemster,
    semesters,
    degreeList,
    setDegreeList,
    selectedDegreePlan,
    SelecetedEditdDegreePlan
}: {
    semester: Semester;
    modifysemster: (semester: Semester[]) => void;
    semesters: Semester[];
    degreeList: DegreePlan[];
    setDegreeList: React.Dispatch<React.SetStateAction<DegreePlan[]>>;
    selectedDegreePlan: DegreePlan;
    SelecetedEditdDegreePlan: DegreePlan;
}): JSX.Element => {
    const deleteCourseFunc = (course: Course) => {
        // delete a course from a semester
        const findDegreeIndex = degreeList.findIndex(
            (degreeplan) => degreeplan === SelecetedEditdDegreePlan
        );
        const findSemesterIndex = SelecetedEditdDegreePlan.semesters.findIndex(
            (s) => s === semester
        );
        const findCourseIndex = SelecetedEditdDegreePlan.semesters[
            findSemesterIndex
        ].courses.findIndex((c) => c === course);
        degreeList[findDegreeIndex].semesters[findSemesterIndex].courses.splice(
            findCourseIndex,
            1
        );
        const update = [...degreeList];
        setDegreeList(update);
        console.log(selectedDegreePlan);
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
        console.log(degreeList);
        // console.log(findDegreeIndex);
    };
    const EmptySemester = (semester: Semester) => {
        //empty all the courses from a semester
        const findDegreeIndex = degreeList.findIndex(
            (degreeplan) => degreeplan === SelecetedEditdDegreePlan
        );
        const findSemesterIndex = SelecetedEditdDegreePlan.semesters.findIndex(
            (s) => s === semester
        );
        degreeList[findDegreeIndex].semesters[findSemesterIndex].courses = [];
        const update = [...degreeList];
        setDegreeList(update);
        semesters[findSemesterIndex].courses = [];
        const update2 = [...semesters];
        modifysemster(update2);
        console.log(degreeList);
    };
    //handle move course to other semester function
    const handleCourseMove = (course: Course, targetSemesterId: string) => {
        const updatedSemesters = semesters.map((semester) => {
            if (semester.season + semester.year === targetSemesterId) {
                return {
                    ...semester,
                    courses: [...semester.courses, course]
                };
            } else if (semester.courses.find((c) => c.code === course.code)) {
                return {
                    ...semester,
                    courses: semester.courses.filter(
                        (c) => c.code !== course.code
                    )
                };
            }
            return semester;
        });
        modifysemster(updatedSemesters);
    };
    return (
        <div className="semester_view">
            <table>
                <thead>
                    <tr>
                        <th>
                            Semster: {semester.season} {semester.year}
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
                                <button
                                    className="emeptySemester"
                                    onClick={() => EmptySemester(semester)}
                                >
                                    Empty
                                </button>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {semester.courses.map((course) => (
                        <tr key={course.code + course.name}>
                            <td>
                                {course.code}
                                {" - "}
                                {course.name}
                            </td>
                            <td> {course.credits}</td>
                            <td>
                                <select
                                    onChange={(e) =>
                                        handleCourseMove(course, e.target.value)
                                    }
                                >
                                    <option value="">Move to...</option>
                                    {semesters.map((s) => (
                                        <option
                                            key={s.season + s.year}
                                            value={s.season + s.year}
                                        >
                                            {s.season} {s.year}
                                        </option>
                                    ))}
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
                                    onClick={() => deleteWholeSemester()}
                                    className="deleteEntireSemesterView"
                                >
                                    {" "}
                                    Delete Entire Semester
                                </button>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
