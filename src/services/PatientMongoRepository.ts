import { PatientModel } from "@models/Patient";
import { Patient } from "domain/Patient/Patient";
import { PatientId } from "domain/Patient/PatientId";
import { UserId } from "domain/User/UserId";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";
import { PatientRepository } from "types/Patient";
import { removeUndefinedProperties } from "utils/removeUndefinedProperties";
import { DateDto } from "dto/DateDto/DateDto";
import { PatientSearchParams } from "dto/SearchParams/PatientSearchParams";
import { PatientAggregationQuery } from "dto/PatientAggregationQuery/PatientAggregationQuery";
import { ENV_VARIABLES } from "configEnv";
import { PipelineStage } from "mongoose";
import { AgreggationResult, IPatient } from "types/IPatient";
import { OptionsAgreggationQuery } from "types/IQueryParams";


export class PatientMongoRepository implements PatientRepository {

    async create(patient: Patient): Promise<Patient> {

       
        const birthdate = new DateDto(patient.birthdate.value).convertToDBFormat()
        const beginningDate = new DateDto(patient.beginningDate.value).convertToDBFormat() 

        const newPatient = await new PatientModel({
            ci: patient.ci.value, name: patient.name.value, userId: patient.userId.value,
            phoneNumber: patient.phoneNumber.value, address: patient.address.value, 
            age: patient.age.value, beginningDate: beginningDate, 
            birthdate: birthdate, sex: patient.sex.value
        }).save()
        
        const newBirthdate = new DateDto(newPatient.birthdate).convertToDomainFormat()
        const newBeginningDate = new DateDto(newPatient.beginningDate).convertToDomainFormat()


        return new Patient(
            newPatient.name, newPatient.userId.toString(), newBirthdate, 
            newPatient.ci, newPatient.phoneNumber, newPatient.address, 
            newPatient.age, newPatient.sex, newBeginningDate, new PatientId(newPatient._id.toString())
        )
    }

    async getAll(): Promise<Patient[]> {
        const patients = await PatientModel.find()


        return patients.map(patient => new Patient(
            patient.name, patient.userId.toString(), new DateDto(patient.beginningDate).convertToDomainFormat(), 
            patient.ci, patient.phoneNumber, patient.address, 
            patient.age, patient.sex, new DateDto(patient.birthdate).convertToDomainFormat(), 
            new PatientId(patient._id.toString())
        ))
    }


    async delete(id: string): Promise<boolean | null> {
        const deletedPatient = await PatientModel.findByIdAndDelete(id)

        if(!deletedPatient) return null

        return Boolean(deletedPatient)
    }

    async getById(id: string): Promise<Patient | null> {
        const patientFind = await PatientModel.findById(id)

        if(!patientFind) return null
        
        const birthdate =  new DateDto(patientFind.birthdate).convertToDomainFormat()
        const beginningDate = new DateDto(patientFind.beginningDate).convertToDomainFormat()

        return new Patient(
            patientFind.name, patientFind.userId.toString(), birthdate, 
            patientFind.ci, patientFind.phoneNumber, patientFind.address, 
            patientFind.age, patientFind.sex, beginningDate, new PatientId(patientFind._id.toString())
        )
    }

    async update(id: string, data: Partial<Patient>): Promise<Patient | null> {

        const toUpdate = removeUndefinedProperties({
            name: data.name?.value, 
            birthdate: data.birthdate?.value,
            ci: data.ci?.value,
            phoneNumber: data.phoneNumber?.value,
            address: data.address?.value,
            age: data.age?.value

        })

        if(toUpdate.birthdate){
            toUpdate.birthdate = typeof toUpdate.birthdate === 'string' 
                ? new DateDto(toUpdate.birthdate).convertToDBFormat() 
                : undefined
        }

        const updatedPatient = await PatientModel.findByIdAndUpdate(id, toUpdate, {new: true})

        if(!updatedPatient) return null

        const birthdate = new DateDto(updatedPatient.birthdate).convertToDomainFormat()
        const beginningDate = new DateDto(updatedPatient.beginningDate).convertToDomainFormat()

        return new Patient(
            updatedPatient.name, 
            updatedPatient.userId.toString(),
            birthdate, 
            updatedPatient.ci, 
            updatedPatient.phoneNumber, 
            updatedPatient.address, 
            updatedPatient.age, 
            updatedPatient.sex, 
            beginningDate, 
            new PatientId(updatedPatient._id.toString())
        )
    }


    async getByCI(ci: number): Promise<Patient | null> {
        const patientFind = await PatientModel.findOne({ci})
        if(!patientFind) return null

        const birthdate = new DateDto(patientFind.birthdate).convertToDomainFormat()
        const beginningDate = new DateDto(patientFind.beginningDate).convertToDomainFormat()

        return new Patient(
            patientFind.name, patientFind.userId.toString(),
            birthdate, patientFind.ci,
            patientFind.phoneNumber, patientFind.address, 
            patientFind.age, patientFind.sex,
            beginningDate,
            new PatientId(patientFind._id.toString())
        )
    }

    async getByUserId(userId: UserId, options?: ObjectAnyProperties): Promise<Patient[]> {
        const patients = await PatientModel.find({userId: userId.value}, {}, options)

        return patients.map(patient => new Patient(
            patient.name, patient.userId.toString(), new DateDto(patient.birthdate).convertToDomainFormat(), 
            patient.ci, patient.phoneNumber, patient.address, 
            patient.age, patient.sex, new DateDto(patient.beginningDate).convertToDomainFormat(), 
            new PatientId(patient._id.toString())
        ))
    }

    async getPatientsByInputSearch(textInput: string, userId: string, options: OptionsAgreggationQuery): Promise<AgreggationResult<Patient> | null > {
        const queryParams = new PatientSearchParams(textInput)

        const MONGO_SEARCH_INDEX = ENV_VARIABLES.MONGO_SEARCH_INDEX

        if(!MONGO_SEARCH_INDEX) throw new Error('MONGO_SEARCH_INDEX not defined')

        const aggregateQuery = new PatientAggregationQuery(MONGO_SEARCH_INDEX, queryParams, userId, options).getAggregationQuery()

        if(!aggregateQuery) throw new Error('Agregation query is empty')

        const [patientsFound] = await PatientModel.aggregate<AgreggationResult<IPatient>>(aggregateQuery as unknown as PipelineStage[])



        if(!patientsFound.patients) return null

        return {
            patients: patientsFound.patients.map(patient => new Patient( 
                patient.name, patient.userId.toString(), new DateDto(patient.beginningDate).convertToDomainFormat(), 
                patient.ci, patient.phoneNumber, patient.address, 
                patient.age, patient.sex, new DateDto(patient.birthdate).convertToDomainFormat(), 
                new PatientId(patient._id.toString())
            )),
            count: patientsFound.count
        }
    }
}
