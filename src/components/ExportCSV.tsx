import Papa from "papaparse";
import degreePlanData from "/.degreePlan";
import React, { useState } from "react";

const degreePlanData = () => {
    const [degreePlan, setDegreePlan] = useState([]);

    const handleExportCSV = () => {
        // Convert degreePlan data to CSV format
        const csv = degreePlan
            .map((course) => Object.values(course).join(","))
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
            <button onClick={handleExportCSV}>Export as CSV</button>
        </div>
    );
};

export default degreePlanData;
