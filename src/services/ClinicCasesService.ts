import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { IClinicCasesService } from "types/ClinicCases";
import { ClinicCasesMongoRepository } from "./ClinicCasesMongoRepository";
import { ClinicCasesId } from "domain/ClinicCases/ClinicCasesId";
import { PatientId } from "domain/Patient/PatientId";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";
import { PartialClinicCasesDto } from "dto/PartialClinicCasesDto";

export class ClinicCasesService implements IClinicCasesService {

    private repository: ClinicCasesMongoRepository

    constructor(repository: ClinicCasesMongoRepository){
        this.repository = repository
    }

    createClinicCases(clinicCases: ClinicCases): Promise<ClinicCases> {
        return this.repository.create(clinicCases)
    }

    deleteClinicCase(clinicCaseId: ClinicCasesId): Promise<boolean | null> {
        return this.repository.delete(clinicCaseId.value)
    }

    getClinicCaseById(clinicCaseId: ClinicCasesId): Promise<ClinicCases | null> {
        return this.repository.getById(clinicCaseId.value)
    }

    getClinicCasesByPatientId(patientId: PatientId, options?: ObjectAnyProperties): Promise<ClinicCases[]> {
        return this.repository.getByPatientId(patientId.value, options)
    }

    updateClinicCase(clinicCaseId: ClinicCasesId, clinicCase: PartialClinicCasesDto): Promise<ClinicCases | null> {
        return this.repository.update(clinicCaseId.value, clinicCase)
    }
    
}