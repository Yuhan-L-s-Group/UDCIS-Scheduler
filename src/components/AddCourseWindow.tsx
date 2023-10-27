import React, { useState } from "react";
import { Course } from "../interfaces/course";

interface AddCourseWindow {
    onClose: () => void;
    listCourses: Course[];
    setListCourses: (prop: Course[]) => void;
}

export function AddCourseWindow({
    onClose,
    listCourses,
    setListCourses
}: AddCourseWindow) {
    const [course, setCourse] = useState<Course>({
        code: "",
        name: "",
        description: "",
        credits: 0,
        preReq: [],
        coreReq: []
    });
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState(0);
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(e.target.value);
    };

    const handleCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredits(Number(e.target.value));
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setCourse({
    //         ...course,
    //         [na
    //     });
    // };

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
        updated.splice(updated.length, 0, courseObject);
        console.log(courseObject);
        setListCourses(updated);
        console.log(updated);
        onClose();
    };

    return (
        <div>
            <h2>Add Course</h2>
            <label>
                Code:
                <input
                    type="text"
                    name="code"
                    value={code}
                    onChange={handleCodeChange}
                />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </label>

            <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </label>

            <label>
                Credits:
                <input
                    type="number"
                    name="credits"
                    value={credits}
                    onChange={handleCreditsChange}
                />
            </label>

            <button onClick={handleConfirm}>Confirm</button>
        </div>
    );
}
