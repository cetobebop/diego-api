import { Patient } from "domain/Patient/Patient";
import { PatientCI } from "domain/Patient/PatientCI";
import { PatientId } from "domain/Patient/PatientId";
import { UserId } from "domain/User/UserId";
import { AgreggationResult } from "types/IPatient";
import { OptionsAgreggationQuery } from "types/IQueryParams";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";
import { IPatientService, PatientRepository } from "types/Patient";

export class PatientService implements IPatientService {

    constructor(private repository: PatientRepository){}

    createPatient(patient: Patient): Promise<Patient> {
        return this.repository.create(patient)
    }

    getAllPatient(): Promise<Patient[]> {
        return this.repository.getAll()
    }

    getPatientById(id: PatientId): Promise<Patient | null> {
        return this.repository.getById(id.value)
    }

    updatePatient(id: PatientId, patient: Partial<Patient>): Promise<Patient | null> {
        return this.repository.update(id.value, patient)
    }

    deletePatient(id: PatientId): Promise<Boolean | null> {
        return this.repository.delete(id.value)
    }

    getPatientByCI(ci: PatientCI): Promise<Patient | null> {
        return this.repository.getByCI(ci.value)
    }

    getPatientsByUserId(userId: UserId, options?: ObjectAnyProperties): Promise<Patient[]> {
        return this.repository.getByUserId(userId, options)
    }

    getPatientsByInputSearch(textInput: string, userId: UserId, options: OptionsAgreggationQuery): Promise<AgreggationResult<Patient> | null> {
        return this.repository.getPatientsByInputSearch(textInput, userId.value, options)
    }
}