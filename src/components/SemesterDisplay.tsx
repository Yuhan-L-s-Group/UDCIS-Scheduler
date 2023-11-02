import React, { useState } from "react";

export type Season = "Fall" | "Winter" | "Spring" | "Summer";

interface Semester {
    season: Season;
    year: number;
}

const SemesterDisplay: React.FC = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<Season>("Fall");
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );

    const handleAddSemester = () => {
        setShowModal(true);
    };

    const handleDeleteSemester = (index: number) => {
        const newSemesters = [...semesters];
        newSemesters.splice(index, 1);
        setSemesters(newSemesters);
    };

    const handleClearAll = () => {
        setSemesters([]);
    };

    const handleSubmit = () => {
        setSemesters([
            ...semesters,
            { season: selectedSeason, year: selectedYear }
        ]);
        setShowModal(false);
    };

    return (
        <div>
            {semesters.map((semester, index) => (
                <div key={index}>
                    <h3>
                        {semester.season} {semester.year}
                    </h3>
                    <button onClick={() => handleDeleteSemester(index)}>
                        Delete
                    </button>
                </div>
            ))}

            {showModal && (
                <div>
                    <select
                        value={selectedSeason}
                        onChange={(e) =>
                            setSelectedSeason(e.target.value as Season)
                        }
                    >
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                    </select>
                    <input
                        type="number"
                        value={selectedYear}
                        onChange={(e) =>
                            setSelectedYear(Number(e.target.value))
                        }
                        placeholder="Year"
                    />
                    <button onClick={handleSubmit}>ADD</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}

            <button onClick={handleAddSemester}>Add Semester</button>
            <button onClick={handleClearAll}>Clear All</button>
        </div>
    );
};

export default SemesterDisplay;
