import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { Repository } from "./Repository";
import { ClinicCasesId } from "domain/ClinicCases/ClinicCasesId";
import { PatientId } from "domain/Patient/PatientId";
import { ObjectAnyProperties } from "./ObjectAnyProperties";



export type ClinicCasesRepository = Repository<ClinicCases> & {
    getByPatientId(patientId: string, userId: string, options?: ObjectAnyProperties): Promise<ClinicCases[]>
}

export type IClinicCasesService = {
    createClinicCases (clinicCases: ClinicCases): Promise<ClinicCases>
    deleteClinicCase (id: ClinicCasesId, userId: string): Promise<boolean | null>
    getClinicCasesByPatientId (patientId: PatientId, userId: string, options?: ObjectAnyProperties): Promise<ClinicCases[]>
    getClinicCaseById (clinicCaseId: ClinicCasesId, userId: string): Promise<ClinicCases | null>
    updateClinicCase (clinicCaseId: ClinicCasesId, clinicCase: Partial<ClinicCases>, userId: string): Promise<ClinicCases | null>
}