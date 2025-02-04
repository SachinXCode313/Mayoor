import express from "express";
import getStudents from "../controllers/students.js";
import { createAssessmentCriteria, getAssessmentCriterias } from "../controllers/assessmentCriterias.js";
import { createLearningOutcome, getLearningOutcomes } from "../controllers/learningOutcomes.js";
import getReportOutcomes from "../controllers/reportOutcomes.js";
import { getAssessmentCriteriaScores, setAssessmentCriteriaScore } from "../controllers/assessmentCriteriasScores.js";
import getLearningOutcomesScore from "../controllers/learningOutcomesScore.js";
import getReportOutcomesScore from "../controllers/reportOutcomesScore.js";
import {getReportOutcomesMapping,setReportOutcomesMapping} from "../controllers/reportOutcomesMapping.js";
import verifyToken from "../controllers/verifyToken.js";
import { getClassAverageACScore, getClassAverageLOScore, getClassAverageROScore } from "../controllers/classAverageScore.js";
import { getLearningOutcomesMapping, setLearningOutcomesMapping } from "../controllers/learningOutcomesMapping.js";
import getTeachers from "../controllers/teachers.js";
// import { saveToken, sendNotification } from "../controllers/sendNotification.js";


const routers = express.Router();

routers.get('/students',getStudents)
routers.get("/teachers", getTeachers);
routers.get('/assessment-criteria',getAssessmentCriterias)
routers.get('/learning-outcome',getLearningOutcomes)
routers.get('/report-outcome',getReportOutcomes)
routers.get('/assessment-criteria-score',getAssessmentCriteriaScores)
routers.get('/learning-outcome-score',getLearningOutcomesScore)
routers.get('/report-outcome-score',getReportOutcomesScore)
routers.get('/class-average-ac-score',getClassAverageACScore)
routers.get('/class-average-lo-score',getClassAverageLOScore)
routers.get('/class-average-ro-score',getClassAverageROScore)
routers.get('/learning-outcome-mapping',getLearningOutcomesMapping)
routers.get('/report-outcome-mapping',getReportOutcomesMapping)

routers.post('/assessment-criteria',createAssessmentCriteria)
routers.post('/learning-outcome',createLearningOutcome)
routers.post('/assessment-criteria-score',setAssessmentCriteriaScore)
routers.post('/learning-outcome-mapping',setLearningOutcomesMapping)
routers.post('/report-outcome-mapping',setReportOutcomesMapping)

// routers.post('/save-token',saveToken)
// routers.post('/send-notifications',sendNotification)

routers.post('/verify-token',verifyToken)



export default routers;