import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';    

import userRouter from "@routes/User.routes";
import authRouter from "@routes/Auth.routes";
import patientRouter from "@routes/Patient.routes"
import clinicCasesRouter from '@routes/ClinicCases.routes'
import historyPatientRouter from '@routes/HistoryPatient.routes'
import limiter from "@config/rate-limiter";
import { ENV_VARIABLES } from "configEnv";

const app = express()


const __dirname = dirname(fileURLToPath(import.meta.url));

const corsOptions = {
  origin: ENV_VARIABLES.CORS_URL, 
  credentials: true
};

app.use("/public", express.static(path.join(__dirname, "public" )))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(limiter) 
app.disable('x-powered-by')

app.use('/api/patients', patientRouter)
app.use('/api/history_patients', historyPatientRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/clinic_cases', clinicCasesRouter)


export default app