
import {Schema, model} from 'mongoose'

import { IClinicCases } from 'types/IClinicCases'


const ClinicCasesSchema = new Schema<IClinicCases>({
    
    beginningDate: Date,
    caseNumber: {
        unique: true,
        type: Number
    },
    title: String,
    url: String,
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    }

})

export const ClinicCasesModel = model('ClinicCases', ClinicCasesSchema)