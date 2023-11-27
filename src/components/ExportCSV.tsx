import Papa from 'papaparse';
import degreePlan from '/.degreePlan';
import React, { useState } from "react";

export const ExportCSV = ({
    degreePlan,
    showModal,
    updatePlan
}: {
    degreePlans: DegreePlan[];
    showModal: () => void;
}) => {

const degreePlanData = () => {
  const [degreePlan, setDegreePlan] = useState([]); ;


const csv = Papa.unparse(degreePlanData);

const handleExportCSV = () => {
    // Converting degreePlan data to CSV format
    const csv = degreePlan.map(course => Object.values(course).join(',')).join('\n');

const blob = new Blob([csv], { type: 'text/csv' });
const url = window.URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'degree_plan.csv');
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

return (
    <div>
      <button onClick={handleExportCSV}>Export as CSV</button>
    </div>
  );
};

export default degreePlan;