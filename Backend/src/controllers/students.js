import db from "../config/db.js";

// Get students
const getStudents =  async (req, res) => {
    const year = req.headers['year'];
    const className = req.headers['classname'];
    const section = req.headers['section'];
    // Check if all required headers are present
    if (!year || !className || !section) {
        return res.status(400).json({
            message: "Missing required headers. Please provide 'year', 'classname', and 'section'."
        });
    }
    // Validate year (should be a number)
    if (isNaN(year)) {
        return res.status(400).json({
            message: "Invalid header value. 'year' should be a number."
        });
    }
    // Validate className (should be a string or numeric value depending on your use case)
    if (!className.trim()) {
        return res.status(400).json({
            message: "Invalid header value. 'classname' cannot be empty."
        });
    }
    // Validate section (should not be empty)
    if (!section.trim()) {
        return res.status(400).json({
            message: "Invalid section. 'section' cannot be empty."
        });
    }
    try {
        // SQL query to get students' details along with their record information
        const query = `
            SELECT 
                s.id, 
                s.name, 
                sc.year, 
                sc.section, 
                sc.class 
            FROM students s 
            JOIN students_records sc ON s.id = sc.student_id 
            WHERE sc.year = ? AND sc.class = ? AND sc.section = ?
        `;
        // Execute query with the year, classname, and section as parameters
        const [results] = await db.execute(query, [year, className, section]);
        // If no results found, return 404 error
        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found for the given year, class, and section.' });
        }
        // Return the list of students found, including their ID, name, and record details
        return res.status(200).json({ students: results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export default getStudents;