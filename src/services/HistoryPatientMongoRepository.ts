import { HistoryPatientModel } from "@models/HistoryPatient";
import { HistoryPatient, PatientSnapshot} from "domain/HistoryPatient/HistoryPatient";

import { HistoryPatientRepository } from "types/HistoryPatient";
import { getSnapshots } from "utils/getSnapshots";



export class HistoryPatientMongoRepository implements HistoryPatientRepository {
    async create(histPat: HistoryPatient): Promise<HistoryPatient> {

        const newHisPat = histPat.toPrimitive()
    
        const created = await  new HistoryPatientModel(newHisPat).save()

        const snapshot = getSnapshots(created.changes)

        return new HistoryPatient(created.patientId.toString(), created.userId.toString(), snapshot, created._id.toString())
    }

    async update(id: string, histPat: HistoryPatient){

        const found = await HistoryPatientModel.findOne({patientId: id})
        if(!found) return null


        found.changes.push(histPat.changes[0].toPrimitive())
        await found.save()

        const snapshot = getSnapshots(found.changes)

        return new HistoryPatient(found.patientId.toString(), found.userId.toString(), snapshot, found._id.toString())
        
    }

    async getById(id: string): Promise<HistoryPatient | null> {
        const found = await HistoryPatientModel.findOne({_id: id})
        if(!found) return null

        const snapshot = getSnapshots(found.changes)

        return new HistoryPatient(found.patientId.toString(), found.userId.toString(), snapshot, found._id.toString())
    }


    async delete(id: string): Promise<boolean | null> {
        const found = await HistoryPatientModel.findOneAndDelete({patientId:id})
        if(!found) return null

        return true
    }

    async deletePatientSnapshot(id: string, patientId?: string): Promise<boolean | null> {
        const found = await HistoryPatientModel.findOne({patientId})
        if(!found) return null

        const subdoc = found.changes.id(id)
        if(!subdoc) return null
        subdoc.deleteOne()
        await found.save()

        return true
    }

    async getPatientSnapshot(id: string, patientId: string): Promise<PatientSnapshot | null> {
        const found = await HistoryPatientModel.findOne({patientId})
        if(!found) return null

        const subdoc = found.changes.id(id)
        if(!subdoc) return null

        return new PatientSnapshot(
            subdoc._id?.toString(), subdoc.name,
            subdoc.age, subdoc.birthdate, subdoc.ci,
            subdoc.phoneNumber, subdoc.address, subdoc.updatedAt
        )
    }

    async getByPatientId(patientId: string): Promise<null | HistoryPatient> {
        const found = await HistoryPatientModel.findOne({patientId})
        if(!found) return null

        const snapshot = getSnapshots(found.changes)

        return new HistoryPatient(found.patientId.toString(), found.userId.toString(), snapshot, found._id.toString())
    }
}