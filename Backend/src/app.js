import express, { urlencoded } from 'express'
import cors from 'cors'
import router from './routes/auth.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to CampusPulse API"
    });
});

app.use("/api/auth",router);

export default app