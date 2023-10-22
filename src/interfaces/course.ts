export interface Course {
    //course 's code
    code: string;
    //course's name
    name: string;
    //course description
    description: string;
    //number of credits offered in the course
    credits: number;
    //check the pre-requisites for the course
    preReq: string[];
    //check the core-requisites for the course
    coreReq: string[];
}
