import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreePlan";
import { DegreePlanCard } from "./DegreePlanCard";
import { DegreePlanDetail } from "./DegreePlanDetail";

export const PlanList = ({
    degreePlans,
    showModal
}: {
    degreePlans: DegreePlan[];
    showModal: () => void;
}) => {
    const [displayId, setDisplayId] = useState<null | string>(null);

    const handleQuizView = (id: string) => {
        setDisplayId(id);
    };

    const resetView = () => {
        setDisplayId(null);
    };

    return (
        <div className="quiz_list">
            {!displayId && (
                <>
                    {degreePlans.map((degreePlan: DegreePlan): JSX.Element => {
                        return (
                            <DegreePlanCard
                                key={degreePlan.name}
                                degreePlan={degreePlan}
                                handleClick={handleQuizView}
                                semesters={degreePlan.semesters}
                            ></DegreePlanCard>
                        );
                    })}
                </>
            )}
            {degreePlans.map((degreePlan: DegreePlan): JSX.Element | null => {
                if (displayId === degreePlan.name) {
                    return (
                        <DegreePlanDetail
                            key={degreePlan.name}
                            degreePlan={degreePlan}
                            resetView={resetView}
                        ></DegreePlanDetail>
                    );
                }
                return null;
            })}
        </div>
    );
};
