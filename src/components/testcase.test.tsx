import React, { useState } from "react";
import "./App.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import { IntroModal } from "../components/IntroModal";
import { SwitchPlan } from "../components/SwitchPlan";
import { AddSemesterModal } from "../components/SemesterModal";
import { Season, Semester } from "../interfaces/semester";
import { SemesterList } from "../components/SemsterList";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo1 from "./pictures/udlogo2.jpg";
import { AddCourse } from "../components/AddCourse";
import CoursesTable from "../components/courseTable";
import Courses from "../data/course.json";
import { Course } from "../interfaces/course";
import Search from "../components/Search";
