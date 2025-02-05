import db from "../config/db.js";

const getClassAverageACScore = async (req, res) => {
    try {
        const { subject, classname, year, quarter, section } = req.headers;
        // Validate required headers
        if (!subject || !classname || !year || !quarter || !section) {
            return res.status(400).json({
                error: "Missing required headers: subject, classname, year, quarter, or section.",
            });
        }

        // Query to get average scores per AC
        const [acAverages] = await db.query(`
            SELECT ac.id, AVG(ascore.value) AS average_score
            FROM ac_scores ascore
            JOIN students_records sr ON ascore.student_id = sr.student_id
            JOIN assessment_criterias ac ON ascore.ac_id = ac.id
            WHERE sr.year = ?
              AND sr.class = ?
              AND sr.section = ?
              AND ac.subject = ?
              AND ac.quarter = ?
            GROUP BY ac.id
            ORDER BY ac.id;
        `, [year, classname, section, subject, quarter]);

        if (acAverages.length === 0) {
            return res.status(404).json({ error: "No AC scores found for the provided filters." });
        }

        // Format the response and round average_score to 3 decimal places
        const result = acAverages.map(row => ({
            ac_id: row.id,
            average_score: parseFloat(row.average_score.toFixed(3)) // Round to 3 decimal places
        }));

        // Calculate overall average and round to 3 decimal places
        const overallAverage = result.reduce((sum, item) => sum + item.average_score, 0) / result.length;
        
        res.status(200).json({ 
            class_ac_averages: result,
            overall_average: parseFloat(overallAverage.toFixed(3)) // Rounded to 3 decimal places
        });
    } catch (error) {
        console.error("Error fetching class AC averages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getClassAverageLOScore = async (req, res) => {
    try {
        const { subject, classname, year, quarter, section } = req.headers;
        // Validate required headers
        if (!subject || !classname || !year || !quarter || !section) {
            return res.status(400).json({
                error: "Missing required headers: subject, classname, year, quarter, or section.",
            });
        }
        // Query to get average scores per LO
        const [loAverages] = await db.query(`
            SELECT lo.id, AVG(ls.value) AS average_score
            FROM lo_scores ls
            JOIN students_records sr ON ls.student_id = sr.student_id
            JOIN learning_outcomes lo ON ls.lo_id = lo.id
            WHERE sr.year = ?
              AND sr.class = ?
              AND sr.section = ?
              AND lo.subject = ?
              AND lo.quarter = ?
            GROUP BY lo.id
            ORDER BY lo.id;
        `, [year, classname, section, subject, quarter]);
        if (loAverages.length === 0) {
            return res.status(404).json({ error: "No LO scores found for the provided filters." });
        }
        // Format the response
        const result = loAverages.map(row => ({
            lo_id: row.id,
            average_score: parseFloat(row.average_score)
        }));
        res.status(200).json({ class_lo_averages: result });
    } catch (error) {
        console.error("Error fetching class LO averages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getClassAverageROScore =  async (req, res) => {
    try {
        const { subject, classname, year, section } = req.headers;
        // Validate required headers
        if (!subject || !classname || !year || !section) {
            return res.status(400).json({
                error: "Missing required headers: subject, classname, year, or section.",
            });
        }
        // Query to get average scores per RO
        const [roAverages] = await db.query(`
            SELECT ro.id, AVG(rs.value) AS average_score
            FROM ro_scores rs
            JOIN students_records sr ON rs.student_id = sr.student_id
            JOIN report_outcomes ro ON rs.ro_id = ro.id
            WHERE sr.year = ?
              AND sr.class = ?
              AND sr.section = ?
              AND ro.subject = ?
            GROUP BY ro.id
            ORDER BY ro.id;
        `, [year, classname, section, subject]);
        if (roAverages.length === 0) {
            return res.status(404).json({ error: "No RO scores found for the provided filters." });
        }
        // Format the response
        const result = roAverages.map(row => ({
            ro_id: row.id,
            average_score: parseFloat(row.average_score)
        }));
        res.status(200).json({ class_ro_averages: result });
    } catch (error) {
        console.error("Error fetching class RO averages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export {getClassAverageACScore,getClassAverageLOScore,getClassAverageROScore};
