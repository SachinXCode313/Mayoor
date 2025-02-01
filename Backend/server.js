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

app.get('/test', (req, res) => {
    res.status(200).json({ message: "Server is working fine!" });
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});