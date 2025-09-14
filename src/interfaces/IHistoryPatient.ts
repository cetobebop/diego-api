import { Types, Document } from "mongoose"

export interface IPatientSnapshot extends Document {
    _id: Types.ObjectId,
    name: string
    ci: string
    birthdate: Date
    address: string,
    phoneNumber: number,
    age: number,
    updatedAt: Date
} 

export interface IHistoryPatient extends Document {
    userId: Types.ObjectId,
    _id: Types.ObjectId,
    patientId: Types.ObjectId,
    changes: Types.DocumentArray<Partial<IPatientSnapshot>>
} 