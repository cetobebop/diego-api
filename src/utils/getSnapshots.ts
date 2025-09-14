import { PatientSnapshot } from "domain/HistoryPatient/HistoryPatient";
import { IPatientSnapshot } from "interfaces/IHistoryPatient";

export function getSnapshots(changes: Partial<IPatientSnapshot>[]){
        return changes.map(el => new PatientSnapshot(el._id?.toString(), el.name, el.age, el.birthdate, el.ci, el.phoneNumber, el.address, el.updatedAt))
    }