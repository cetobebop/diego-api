
import {Schema, model} from 'mongoose'

import { IClinicCases } from 'types/IClinicCases'


const ClinicCasesSchema = new Schema<IClinicCases>({
    
    beginningDate: Date,
    caseNumber: {
        type: String
    },
    title: String,
    url: String,
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

})

export const ClinicCasesModel = model('ClinicCases', ClinicCasesSchema)