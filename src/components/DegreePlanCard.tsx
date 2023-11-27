import React from "react";
import { DegreePlan } from "../interfaces/degreePlan";
import { Semester } from "../interfaces/semester";

//import ".css";

export const DegreePlanCard = ({
    degreePlan,
    handleClick,
    semesters
}: {
    degreePlan: DegreePlan;
    handleClick: (name: string) => void;
    semesters: Semester[];
}) => {
    function totalCredit(semester: Semester[]): number {
        const total = semester.reduce(
            (acc, iter) =>
                acc +
                iter.courses.reduce(
                    (acc1, iter1) => acc1 + parseInt(iter1.credits),
                    0
                ),
            0
        );
        return total;
    }

    return (
        <div className="plan_view_list">
            <div className="list_of_degree_plan">
                <h3
                    className="title"
                    onClick={() => {
                        handleClick(degreePlan.name);
                    }}
                >
                    {degreePlan.name}
                </h3>
                <p>Total credits: {totalCredit(semesters)}</p>
            </div>
            <p>Concentration: {degreePlan.concentration}</p>
        </div>
    );
};
