import React from "react";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreePlan";

interface ExportCSVProps {
    degreeList: DegreePlan[];
}
/* change this degree list to degree plan */
export const ExportCSV: React.FC<ExportCSVProps> = ({ degreeList }) => {
    const handleExportCSV = () => {
        // Combine semester data into a flat array for CSV export
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
        //if you pass in degree plan take away this bottom line and then youd be able to name your file according to the plan
        degreeList.forEach((degreePlan: DegreePlan) => {
            degreePlan.semesters.forEach((semester: Semester) => {
                semester.courses.forEach((course) => {
                    csvData.push({
                        Plan: `${degreePlan.name}`,
                        Semester: `${semester.season} ${semester.year}`,
                        CourseCode: `${course.code}`,
                        CourseName: course.name,
                        Credits: course.credits,
                        Concentration: `${degreePlan.concentration}`
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

        //making filename to name csv file
        //const filename = `${name}_${concentration}_degree_plan.csv`;

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            prompt("Name the file you just downloaded") || "Plans.CSV"
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <button onClick={handleExportCSV} className="ExportCSV">
                Export Degree Plans as CSV
            </button>
        </div>
    );
};

export default ExportCSV;
