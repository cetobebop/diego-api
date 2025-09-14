import { Types } from "mongoose"


export type IClinicCases = {
    _id?: Types.ObjectId,
    caseNumber: string,
    url: string,
    beginningDate: Date,
    title: string,
    patientId: Types.ObjectId,
    userId: Types.ObjectId

}