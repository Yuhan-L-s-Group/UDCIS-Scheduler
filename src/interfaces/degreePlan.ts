import { Semester } from "./semester";
import ImportCSVComponent from "./ImportCSV";

export type Concentration =
    | "Bachelor of Arts"
\    | "Bachelor of Science"
    | "Artificial Intelligence and Robotics"
    | "Bioinformatics"
    | "Cybersecurity"
    | "Data Science"
    | "High Performance Computing"
    | "Systems and Networks"
    | "Theory and Computation"
    | "Information Systems";

//interface for a single semester
export interface DegreePlan {
    //degree may has a name
    name: string;
    //student must have a concentration that is one of the above
    concentration: Concentration;
    //an array of semester that are in this degree olan
    semesters: Semester[];
    //total current credits for this degree plan
    //credit: number;
}
