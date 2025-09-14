import { ClinicCasesDate } from "domain/ClinicCases/ClinicCasesDate";
import { ClinicCasesNumber } from "domain/ClinicCases/ClinicCasesNumberClinicCasesNumber";
import { ClinicCasesTitle } from "domain/ClinicCases/ClinicCasesTitle";
import { ClinicCasesURL } from "domain/ClinicCases/ClinicCasesURL";
import { removeUndefinedProperties } from "utils/removeUndefinedProperties";

type ClinicCaseRaw = {
    caseNumber?: string
    title?: string
    beginningDate?: string
    url?: string
}

export class PartialClinicCasesDto {
    
    caseNumber?: ClinicCasesNumber
    title?: ClinicCasesTitle
    beginningDate?: ClinicCasesDate
    url?: ClinicCasesURL
    
    private constructor(
        partialClinicCase: {
            caseNumber?: ClinicCasesNumber,
            beginningDate?: ClinicCasesDate,
            title?: ClinicCasesTitle,
            url?: ClinicCasesURL,
        
        }
    ){

        
        Object.assign(this, partialClinicCase)
    }


    public static create(clinicCase: ClinicCaseRaw){
    
        const caseNumber = clinicCase.caseNumber ? new ClinicCasesNumber(clinicCase.caseNumber) : undefined
        const title = clinicCase.title ? new ClinicCasesTitle(clinicCase.title) : undefined
        const beginningDate = clinicCase.beginningDate ? new ClinicCasesDate(clinicCase.beginningDate) : undefined
        const url = clinicCase.url ? new ClinicCasesURL(clinicCase.url) : undefined
        

        const patientProps = removeUndefinedProperties({
            caseNumber,
            title,
            beginningDate,
            url,

        })

        return new PartialClinicCasesDto(patientProps)
    }

        toPrimitive(){
                return removeUndefinedProperties({
                    beginningDate: this.beginningDate?.value,
                    caseNumber: this.caseNumber?.value,
                    title: this.title?.value,
                    url: this.url?.value,
                })
            }

}