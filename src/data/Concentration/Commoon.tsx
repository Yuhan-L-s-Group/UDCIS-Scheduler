/* eslint-disable no-extra-parens */
import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreePlan";
import all from "../RequiredCourses/FitsAll.json";
import { Requirement } from "../../interfaces/Requirement";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";

export const Common = ({ degreePlan }: { degreePlan: DegreePlan }) => {
    const allCourses = degreePlan.semesters.flatMap((semester) =>
        semester.courses.map((course) => course.code)
    );
    function compare(array1: string[], array2: string[]): boolean {
        return array1.some((element) => array2.includes(element));
    }
    function findSame(array1: string[], array2: string[]): string[] {
        return array1.filter((element) => array2.includes(element));
    }

    
    let HTMLoutPut = ``;
    all.forEach(require => {
        HTMLoutPut += `<h3>${require.name}</h3>`
        if (require.type === "course"){
           const result = findSame(allCourses, require.courses);
           if(result.length === require.number){
            
           }
        }
        
        else {}//asks credit
            degreePlan.semesters.forEach((semester: Semester) => {
                semester.courses.forEach((course: Course) => {
            }
        }
    }

    //✔️❌
    return (
        <div>
            <br></br>
        </div>
    );
};
