import { Semester } from "./semester";

export type Concentration =
    | "Bachelor of Arts"
    | "Bachelor of Science"
    | "Artificial Intelligence and Robotics"
    | "Bioinformatics"
    | "Cybersecurity"
    | "Data Science"
    | "High Performance Computing (Applied Math Track)"
    | "High Performance Computing (Data Track)"
    | "Systems and Networks"
    | "Theory and Computation (Discrete Track)"
    | "Theory and Computation (Continuous Track)";

//interface for a single semester
export interface DegreePlan {
    //degree may has a name
    name: string;
    //student must have a concentration that is one of the above
    concentration: Concentration;
    //an array of semester that are in this degree olan
    semesters: Semester[];
}
