import { Patient } from "domain/Patient/Patient"
import { Types } from "mongoose"


export type IPatient = {

    _id: string
    name: string
    birthdate: Date
    ci: string
    phoneNumber: number
    address: string
    age: number
    sex: string
    beginningDate: Date,
    userId: Types.ObjectId
    clinicCasesIds: Types.ObjectId[],
    status: string
    
    
}


type CountResult = {
  total: number;
}

export type AgreggationResult <T> = {
  patients: T[];
  count: CountResult[];
}

export interface GetByUserIdResult {
    patients: Patient[]
    total: number
}