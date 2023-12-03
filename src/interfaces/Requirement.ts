export type RequirementType = "courses" | "credits";

export interface Requirement {
    //requirment's name
    name: string;
    //what courses this requirment asks
    courses: string[];
    //this requirment asks for number of courses or credits
    type: string;
    //how many courses or credit this requirment need
    number: number;
}
/* Format
{
    "name": ,
    "courses": ,
    "type": ,
    "number": 
}
*/
