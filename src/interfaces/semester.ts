import { Course } from "./course";

//the possible types for a semester
export type Season = "Fall" | "Winter" | "Spring" | "Summer";

//interface for a single semester
export interface Semester {
    season: Season;
    //year of this semester, like 2023
    year: number;
    //an array of courses that are in semester
    courses: Course[];
}
