import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { IClinicCasesService } from "types/ClinicCases";
import { ClinicCasesMongoRepository } from "./ClinicCasesMongoRepository";
import { ClinicCasesId } from "domain/ClinicCases/ClinicCasesId";
import { PatientId } from "domain/Patient/PatientId";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";

export class ClinicCasesService implements IClinicCasesService {

    private repository: ClinicCasesMongoRepository

    constructor(repository: ClinicCasesMongoRepository){
        this.repository = repository
    }

    createClinicCases(clinicCases: ClinicCases): Promise<ClinicCases> {
        return this.repository.create(clinicCases)
    }

    deleteClinicCase(clinicCaseId: ClinicCasesId, userId: string): Promise<boolean | null> {
        return this.repository.delete(clinicCaseId.value, userId)
    }

    getClinicCaseById(clinicCaseId: ClinicCasesId, userId: string): Promise<ClinicCases | null> {
        return this.repository.getById(clinicCaseId.value, userId)
    }

    getClinicCasesByPatientId(patientId: PatientId, userId: string, options?: ObjectAnyProperties): Promise<ClinicCases[]> {
        return this.repository.getByPatientId(patientId.value, userId, options)
    }

    updateClinicCase(clinicCaseId: ClinicCasesId, clinicCase: Partial<ClinicCases>, userId: string): Promise<ClinicCases | null> {
        return this.repository.update(clinicCaseId.value, clinicCase, userId)
    }
    
}