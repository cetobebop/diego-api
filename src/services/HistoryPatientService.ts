import { HistoryPatient, PatientSnapshot } from "domain/HistoryPatient/HistoryPatient";
import { HistoryPatientId } from "domain/HistoryPatient/HistoryPatientId";
import { PatientId } from "domain/Patient/PatientId";
import { HistoryPatientRepository, IHistoryPatientService } from "types/HistoryPatient";


export class HistoryPatientService implements IHistoryPatientService {
    
    constructor(private repository: HistoryPatientRepository){}

    createHistoryPatient(historyPatient: HistoryPatient): Promise<HistoryPatient> {
        return this.repository.create(historyPatient)
    }

    deleteHistoryPatient(id: HistoryPatientId): Promise<boolean | null> {
        return this.repository.delete(id.value)
    }

    getHistoryPatientById(historyPatientId: HistoryPatientId): Promise<HistoryPatient | null> {
        return this.repository.getById(historyPatientId.value)
    }

    getPatientSnapshot(snapshotId: string, patientId: PatientId): Promise<PatientSnapshot | null> {
        return this.repository.getPatientSnapshot(snapshotId, patientId.value)
    }

    deletePatientSnapshot(snapshotId: string, patientId: PatientId): Promise<boolean | null> {
        return this.repository.deletePatientSnapshot(snapshotId, patientId.value)
    }

    getHistoryPatientByPatientId(patientId: PatientId): Promise<HistoryPatient | null> {
        return this.repository.getByPatientId(patientId.value)
    }
}