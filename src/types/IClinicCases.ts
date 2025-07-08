import { Types } from "mongoose"


export type IClinicCases = {
    _id?: Types.ObjectId[],
    caseNumber: number,
    url: string,
    beginningDate: Date,
    title: string,
    patientId: Types.ObjectId
}