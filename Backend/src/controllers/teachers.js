import db from "../config/db.js";

const getTeachers = (req, res) => {
    db.query("SELECT name, status, last_seen FROM teachers", (err, results) => {
        if (err) {
            console.error("❌ Error fetching teacher list:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.status(200).json(results);
    });
};

export default getTeachers