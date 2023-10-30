import React, { useState } from "react";
import { Course } from "../interfaces/course";

interface AddCourseWindowProps {
    onClose: () => void;
    listCourses: Course[];
    setListCourses: (courses: Course[]) => void;
}

export function AddCourseWindow({
    onClose,
    listCourses,
    setListCourses
}: AddCourseWindowProps) {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState(0);

    const handleConfirm = () => {
        const courseObject = {
            code: code,
            name: name,
            description: description,
            credits: credits,
            preReq: [],
            coreReq: []
        };
        const updated = [...listCourses];
        updated.push(courseObject);
        setListCourses(updated);

        // Log the entered data to the console
        console.log("Entered Course Data:", courseObject);
        console.log(updated);
        onClose();
    };

    return (
        <div className="modal-content">
            <h2>Add Course</h2>
            <label>
                Code:
                <input
                    type="text"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>

            <label>
                Credits:
                <input
                    type="number"
                    name="credits"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                />
            </label>

            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
