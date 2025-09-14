import { Patient } from "domain/Patient/Patient"
import { Repository } from "./Repository"
import { UserId } from "domain/User/UserId"
import { ObjectAnyProperties } from "./ObjectAnyProperties"
import { PatientCI } from "domain/Patient/PatientCI"
import { PatientId } from "domain/Patient/PatientId"
import { OptionsAgreggationQuery } from "./IQueryParams"
import { AgreggationResult, GetByUserIdResult } from "./IPatient"


export type PatientRepository = Repository<Patient> & {
    getByCI(ci: number | string): Promise<Patient | null>
    getByUserId(userId: UserId, options?: ObjectAnyProperties): Promise<GetByUserIdResult>
    getPatientsByInputSearch(textInput: string, userId: string, options: OptionsAgreggationQuery): Promise<AgreggationResult<Patient>>
}

export type IPatientService = {

    createPatient(patient: Patient): Promise<Patient>
    deletePatient(id: PatientId): Promise<Boolean | null>
    updatePatient(id: PatientId, patient: Partial<Patient>): Promise<Patient | null>
    getAllPatient(): Promise<Patient[]>
    getPatientById(id: PatientId): Promise<Patient | null>
    getPatientByCI(ci: PatientCI): Promise<Patient | null>
    getPatientsByUserId(userId: UserId, options?: ObjectAnyProperties): Promise<GetByUserIdResult>
    getPatientsByInputSearch(textInput: string, userId: UserId, options: OptionsAgreggationQuery): Promise<AgreggationResult<Patient>>

    
    
}

