import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { SemesterDisplay } from "./SemesterDisplay";
import { Button } from "react-bootstrap";

interface MovableCourse {
    semesters: Semester[];
}
