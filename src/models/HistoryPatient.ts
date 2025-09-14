import { model, Schema } from "mongoose";
import { IHistoryPatient, IPatientSnapshot} from "interfaces/IHistoryPatient";




const patientSnapshot = new Schema <IPatientSnapshot>({
    name: String,
    birthdate: Date,
    age: Number,
    ci: String,
    phoneNumber: Number,
    updatedAt: {
        type: Date,
        default: new Date()
    }, 
    address: String
})

type IHistoryPatientComplete = IHistoryPatient 

const HistoryPatient = new Schema<IHistoryPatientComplete>({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patients'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    changes: [patientSnapshot]
}) 


HistoryPatient.pre('save', function (){

    if(this.changes?.length > 5){
        this.changes.shift()
    }


})


export const HistoryPatientModel = model('HistoryPatients', HistoryPatient)