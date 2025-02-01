import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import routers from './src/routes/routes.js';
import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

app.use('/api', routers)

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hey!!! Server is working fine!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});