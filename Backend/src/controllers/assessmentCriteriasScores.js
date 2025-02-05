import db from "../config/db.js";

// Get Assessment Criterias Scores
const getAssessmentCriteriaScores =  async (req, res) => {
    const { student_id} = req.headers;
    console.log(`Fetching scores and average for Student ID: ${student_id}`);
    if (!student_id) {
        return res.status(400).json({ message: "Missing required headers: student_id" });
    }
    try {
        // Query to fetch all ac_id and values for the student
        const query = `
            SELECT ac_id, value
            FROM ac_scores
            WHERE student_id = ? 
        `;
        const [results] = await db.execute(query, [student_id]);
        if (results.length === 0) {
            return res.status(404).json({ message: "No scores found for the provided Student ID" });
        }
        // Calculate the average value
        const totalScore = results.reduce((acc, row) => acc + parseFloat(row.value), 0); // Sum of all values
        const averageScore = results.length > 0 ? (totalScore / results.length).toFixed(2) : "0.00";

        // Constructing response with fetched data and average
        const response = {
            ac_scores: results, // Return fetched ac_id and value
            average_score: averageScore // Return the calculated average
        };
        res.status(200).json(response);
    } catch (err) {
        console.error("Error fetching scores:", err);
        res.status(500).json({ message: "Server error while fetching scores", error: err.message });
    }
};

// Set Assessment Criteria Scores
const setAssessmentCriteriaScore = async (req, res) => {
    try {
        const { year, quarter, classname, section, subject } = req.headers;
        const { ac_id, scores } = req.body;
        if (!ac_id || !scores || !Array.isArray(scores) || scores.length === 0) {
            return res.status(400).json({ error: "ac_id and an array of scores (student_id, obtained_marks) are required in the body" });
        }
        if (!year || !quarter || !classname || !section) { // Included 'section' in validation
            return res.status(400).json({ error: "year, quarter, className, and section are required in the headers" });
        }
        const [criteriaRows] = await db.query(
            "SELECT max_marks FROM assessment_criterias WHERE id = ? AND quarter = ? AND year = ? AND class = ?",
            [ac_id, quarter, year, classname, section]
        );
        if (criteriaRows.length === 0) {
            return res.status(404).json({ error: "Assessment criteria not found for the given parameters" });
        }
        const max_marks = criteriaRows[0].max_marks;
        let validScores = scores
            .filter(({ student_id, obtained_marks }) => student_id && obtained_marks !== null && obtained_marks <= max_marks)
            .map(({ student_id, obtained_marks }) => [student_id, ac_id, obtained_marks / max_marks]);
        if (validScores.length === 0) {
            return res.status(400).json({ error: "No valid scores to insert" });
        }
        const valuesPlaceholder = validScores.map(() => "(?, ?, ?)").join(", ");
        const flattenedValues = validScores.flat();
        const query = `
            INSERT INTO ac_scores (student_id, ac_id, value)
            VALUES ${valuesPlaceholder}
            ON DUPLICATE KEY UPDATE value = VALUES(value);
        `;
        await db.query(query, flattenedValues);
        res.status(201).json({ message: `${validScores.length} scores saved successfully.` });
    } catch (error) {
        console.error("Error processing scores:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export {getAssessmentCriteriaScores,setAssessmentCriteriaScore};
