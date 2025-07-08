import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { Repository } from "./Repository";
import { ClinicCasesId } from "domain/ClinicCases/ClinicCasesId";
import { PatientId } from "domain/Patient/PatientId";
import { ObjectAnyProperties } from "./ObjectAnyProperties";
import { PartialClinicCasesDto } from "dto/PartialClinicCasesDto";


export type ClinicCasesRepository = Repository<ClinicCases> & {
    getByPatientId(patientId: string, options?: ObjectAnyProperties): Promise<ClinicCases[]>
}

export type ClinicCasesService = {
    createClinicCases (clinicCases: ClinicCases): Promise<ClinicCases>
    deleteClinicCase (id: ClinicCasesId): Promise<boolean | null>
    getClinicCasesByPatientId (patientId: PatientId, options?: ObjectAnyProperties): Promise<ClinicCases[]>
    getClinicCaseById (clinicCaseId: ClinicCasesId): Promise<ClinicCases | null>
    updateClinicCase (clinicCaseId: ClinicCasesId, clinicCase: PartialClinicCasesDto): Promise<ClinicCases | null>
}