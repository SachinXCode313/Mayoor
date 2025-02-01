import express from 'express'; 
import cors from 'cors'; 
import bodyParser from "body-parser";
import routers from './src/routes/routes.js';
import dotenv from "dotenv"
import db from './src/config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json()); 
app.use(cors()); 
app.use(bodyParser.json());

app.use('/api',routers)
app.get('/test', async (req, res) => {
    try {
        console.log("API Hit: /test"); // Debugging
        const query = `SELECT * FROM students`;

        const result = await db.execute(query);
        console.log("Query Result:", result); // Log output
        
        // Check if result is an array before destructuring
        if (!Array.isArray(result)) {
            return res.status(500).json({ message: "Unexpected database response", error: result });
        }

        const [results] = result; // Extract data properly
        if (results.length === 0) {
            return res.status(404).json({ message: "No students found." });
        }

        return res.status(200).json({ Students: results });
    } catch (err) {
        console.error("Database Error:", err); // Log full error
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});