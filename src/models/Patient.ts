
import {Schema, model} from 'mongoose'
import { IPatient } from 'types/IPatient'
import {PatientStatusEnum} from 'enum/PatientStatus'


const PatientSchema = new Schema<IPatient>({
    name: {
        type: String,
        index: true
    },
    age: Number,
    ci: {
        type: String,
        unique: true,
        index: true
    },
    address: String,
    phoneNumber: Number,
    beginningDate: {
        type: Date,
        index: true
    },
    birthdate: Date,
    sex: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    clinicCasesIds: [{
        type: Schema.Types.ObjectId,
        ref: 'ClinicCases',
        
    }],
    status: {
        type: String,
        default: PatientStatusEnum.DEFAULT
    }

})





export const PatientModel = model('Patients', PatientSchema)