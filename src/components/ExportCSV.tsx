import React from "react";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

interface ExportCSVProps {
    degreeList: DegreePlan[];
}

export const ExportCSV: React.FC<ExportCSVProps> = ({ degreeList }) => {
    const handleExportCSV = () => {
        // Combine semester data into a flat array for CSV export
        const csvData: {
            Semester: string;
            CourseName: string;
            Credits: string;
        }[] = [];
        degreeList.forEach((degreePlan: DegreePlan) => {
            degreePlan.semesters.forEach((semester: Semester) => {
                semester.courses.forEach((course) => {
                    csvData.push({
                        Semester: `${semester.season} ${semester.year}`,
                        CourseName: course.name,
                        Credits: course.credits
                    });
                });
            });
        });
        // Convert data to CSV format
        const csv = csvData
            .map((item) => Object.values(item).join(","))
            .join("\n");

        // Create a Blob for downloading
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "degree_plan.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <button onClick={handleExportCSV}>
                Export Degree Plans as CSV
            </button>
        </div>
    );
};

export default ExportCSV;
