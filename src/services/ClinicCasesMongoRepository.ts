import { ClinicCasesModel } from "@models/ClinicCases";
import { PatientModel } from "@models/Patient";
import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { DateDto } from "dto/DateDto/DateDto";
import { InitializationError, NotFoundError } from "error/Errors";
import { ClinicCasesRepository } from "types/ClinicCases";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";
import { removeUndefinedProperties } from "utils/removeUndefinedProperties";

export class ClinicCasesMongoRepository implements ClinicCasesRepository {
    
    async create(clinicCase: ClinicCases): Promise<ClinicCases> {

        const patient = await PatientModel.findById(clinicCase.patientId.value)
        
        if(!patient) throw new InitializationError('This clinic case belongs to a patient who doesnt exist')

        const clinicCasePrimitive = clinicCase.toPrimitive()

        const clinicCaseModifiedToDb = {...clinicCasePrimitive, beginningDate: new DateDto(clinicCasePrimitive.beginningDate).convertToDBFormat()}
        const created = await new ClinicCasesModel(clinicCaseModifiedToDb).save()

        if(patient.clinicCasesIds) patient.clinicCasesIds.push(created._id)
        else patient.clinicCasesIds = [created._id]

        await patient.save()

        const beginningDate = new DateDto(created.beginningDate).convertToDomainFormat()

        return new ClinicCases(
            created.title, beginningDate,
            created.url, created.patientId.toString(), created.userId.toString(),
            created.caseNumber, created._id.toString()
        )

    }

    async delete(id: string, userId?:string): Promise<boolean | null> {

        if(!userId) throw new InitializationError('userId is required')

        const deleted = await ClinicCasesModel.findOneAndDelete({_id: id, userId})

        if(!deleted) return null
        
        const patient = await PatientModel.findById(deleted.patientId)

        if(!patient) throw new NotFoundError('Patient not found')
        
        patient.clinicCasesIds = patient?.clinicCasesIds?.filter(id => id.toString() !== deleted._id.toString())
        await patient.save()

        return Boolean(deleted)
    }

    async update(id: string, data: Partial<ClinicCases>, userId?: string): Promise<ClinicCases | null> {

        if(!userId) throw new InitializationError('userId is required')

        const toUpdate = removeUndefinedProperties({
            caseNumber: data.caseNumber,
            beginnigDate: data.beginningDate,
            title: data.title,
            url: data.url
        })

        if('beginningDate' in toUpdate){
            toUpdate.beginnigDate = new DateDto(toUpdate.beginnigDate as string).convertToDBFormat()
        }

        const updated = await ClinicCasesModel.findOneAndUpdate({_id: id, userId}, toUpdate, {new: true})

        if(!updated) return null

        const date = new DateDto(updated.beginningDate).convertToDomainFormat()

        return new ClinicCases(
            updated.title, date, updated.url, 
            updated.patientId.toString(), updated.userId.toString(), updated.caseNumber, 
            updated._id.toString()
        )
    }
    
    async getById(id: string, userId?: string): Promise<ClinicCases | null> {

        if(!userId) throw new InitializationError('userId is required')

        const find = await ClinicCasesModel.findOne({_id: id, userId})

        if(!find) return null

        const date = new DateDto(find.beginningDate).convertToDomainFormat()

        return new ClinicCases(find.title, date, find.url, find.patientId.toString(),find._id.toString(), find.caseNumber)
    }

    async getByPatientId(patientId: string, userId:string,  options?: ObjectAnyProperties): Promise<ClinicCases[]> {
        const find = await ClinicCasesModel.find({patientId, userId},{}, options) 
        return find.map((el) => new ClinicCases(
                el.title, new DateDto(el.beginningDate).convertToDomainFormat(),
                el.url, el.patientId.toString(), el.userId.toString(),
                el.caseNumber, el._id.toString()
            )
        )
    }

    async getAll(): Promise<ClinicCases[]> {
        return []
    }

}