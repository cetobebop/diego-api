import { ClinicCasesModel } from "@models/ClinicCases";
import { ClinicCases } from "domain/ClinicCases/ClinicCases";
import { DateDto } from "dto/DateDto/DateDto";
import { ClinicCasesRepository } from "types/ClinicCases";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";
import { removeUndefinedProperties } from "utils/removeUndefinedProperties";

export class ClinicCasesMongoRepository implements ClinicCasesRepository {
    
    async create(clinicCase: ClinicCases): Promise<ClinicCases> {

        const created = await new ClinicCasesModel({
            beginningDate: clinicCase.beginningDate.value, caseNumber: clinicCase.caseNumber?.value,
            patientId: clinicCase.patientId.value, title: clinicCase.title.value,
            url: clinicCase.url.value
        }).save()

        const beginningDate = new DateDto(created.beginningDate).convertToDomainFormat()

        return new ClinicCases(
            created.title, beginningDate,
            created.url, created.patientId.toString(),
            created.caseNumber, created._id.toString()
        )

    }

    async delete(id: string): Promise<boolean | null> {
        const deleted = await ClinicCasesModel.findByIdAndDelete(id)

        return Boolean(deleted)
    }

    async update(id: string, data: Partial<ClinicCases>): Promise<ClinicCases | null> {
        const toUpdate = removeUndefinedProperties({
            caseNumber: data.caseNumber,
            beginnigDate: data.beginningDate,
            title: data.title,
            url: data.url
        })

        if('beginningDate' in toUpdate){
            toUpdate.beginnigDate = new DateDto(toUpdate.beginnigDate as string).convertToDBFormat()
        }

        const updated = await ClinicCasesModel.findByIdAndUpdate(id, toUpdate, {new: true})

        if(!updated) return null

        const date = new DateDto(updated.beginningDate).convertToDomainFormat()

        return new ClinicCases(
            updated.title, date, updated.url, 
            updated.patientId.toString(), updated.caseNumber, 
            updated._id.toString()
        )
    }
    
    async getById(id: string): Promise<ClinicCases | null> {
        const find = await ClinicCasesModel.findById(id)

        if(!find) return null

        const date = new DateDto(find.beginningDate).convertToDomainFormat()

        return new ClinicCases(find.title, date, find.url, find.patientId.toString(), find.caseNumber, find._id.toString())
    }

    async getByPatientId(patientId: string, options?: ObjectAnyProperties): Promise<ClinicCases[]> {
        const find = await ClinicCasesModel.find({patientId},{}, options) 
        return find.map((el) => new ClinicCases(
            el.title, new DateDto(el.beginningDate).convertToDomainFormat(),
            el.url, el.patientId.toString(), 
            el.caseNumber, el._id.toString()
            )
        )
    }

    async getAll(): Promise<ClinicCases[]> {
        return []
    }

}