import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from "@routes/User.routes";
import authRouter from "@routes/Auth.routes";
import patientRouter from "@routes/Patient.routes"

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/patients', patientRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


export default app