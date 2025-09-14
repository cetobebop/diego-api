import { HistoryPatient, PatientSnapshot } from "domain/HistoryPatient/HistoryPatient";
import { Repository } from "./Repository";
import { HistoryPatientId } from "domain/HistoryPatient/HistoryPatientId";
import { PatientId } from "domain/Patient/PatientId";



export type HistoryPatientRepository = Omit<Repository<HistoryPatient>, 'getAll' > & {
    getPatientSnapshot(id: string, patientId: string): Promise<PatientSnapshot | null>
    deletePatientSnapshot(id: string, patientId: string): Promise<boolean | null>
    getByPatientId(patientId: string): Promise<null | HistoryPatient>

}

export type IHistoryPatientService = {
    createHistoryPatient(historyPatient: HistoryPatient): Promise<HistoryPatient>
    deleteHistoryPatient(id: HistoryPatientId): Promise<boolean | null>
    getHistoryPatientByPatientId(patientId: PatientId): Promise<HistoryPatient | null>
    getPatientSnapshot(snapshotId: string, patientId: PatientId): Promise<PatientSnapshot | null>
    deletePatientSnapshot(snapshotId: string, patientId: PatientId): Promise<boolean | null>
    getHistoryPatientById(historyPatientId: HistoryPatientId): Promise<null | HistoryPatient>
}


