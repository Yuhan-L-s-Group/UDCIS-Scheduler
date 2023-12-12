import React, { ChangeEvent, useState } from "react";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

interface ImportCSVProps {
    onImport: DegreePlan[];
}

export const ImportCSV: React.FC<ImportCSVProps> = ({ onImport }) => {
    const handleImportCSV = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                if (event && event.target) {
                    const csvText = event.target.result as string;

                    // Parse CSV data and convert it to the desired format
                    const csvData: {
                        Plan: string;
                        Semester: string;
                        CourseCode: string;
                        CourseName: string;
                        Credits: string;
                        Concentration: string;
                    }[] = [
                        {
                            Plan: "Plan",
                            Semester: "Season",
                            CourseCode: "Course Code",
                            CourseName: "Course Name",
                            Credits: "Credits",
                            Concentration: "Concentration"
                        }
                    ];
                }
            };

            fileReader.readAsText(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="ImportCSVInput"
            />
        </div>
    );
};

export default ImportCSV;
