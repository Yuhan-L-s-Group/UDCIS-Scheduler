// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useRef } from "react";
import { Concentration, DegreePlan } from "../interfaces/degreePlan";
import { Season } from "../interfaces/semester";

interface ImportCSVProps {
    onImport: (degreeList: DegreePlan[]) => void;
}

export const ImportCSV: React.FC<ImportCSVProps> = ({ onImport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportCSV = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const csvData = e.target?.result as string;
                    const degreePlans = parseCSVData(csvData);
                    onImport(degreePlans);
                } catch (error) {
                    console.error("Error parsing CSV:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    const parseCSVData = (csvData: string): DegreePlan[] => {
        const lines = csvData.split("\n");

        // Assuming the first row contains headers, skip it
        const headers = lines[0].split(",");

        const degreePlans: DegreePlan[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",");
            if (values.length !== headers.length) {
                console.error(`Skipping invalid CSV row at index ${i}`);
                continue;
            }

            const degreePlan: DegreePlan = {
                concentration: values[
                    headers.indexOf("Concentration")
                ] as Concentration,
                semesters: [
                    {
                        season: values[headers.indexOf("Semester")] as Season,
                        year: parseInt(
                            values[headers.indexOf("Semester") + 1],
                            10
                        ),
                        courses: [
                            {
                                code: values[headers.indexOf("CourseCode")],
                                name: values[headers.indexOf("CourseName")],
                                credits: values[headers.indexOf("Credits")],
                                descr: "",
                                preReq: "",
                                restrict: "",
                                breadth: "",
                                typ: ""
                            }
                        ]
                    }
                ],
                name: ""
            };

            // Check if the degree plan already exists, and if so, add semesters and courses
            const existingDegreePlan = degreePlans.find(
                (dp) =>
                    dp.name === degreePlan.name &&
                    dp.concentration === degreePlan.concentration
            );
            if (existingDegreePlan) {
                existingDegreePlan.semesters.push(...degreePlan.semesters);
            } else {
                degreePlans.push(degreePlan);
            }
        }

        return degreePlans;
    };

    return (
        <div>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
            />
            <button onClick={handleImportCSV}>Import</button>
        </div>
    );
};

export default ImportCSV;
