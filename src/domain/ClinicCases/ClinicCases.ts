import { PatientId } from "domain/Patient/PatientId";
import { ClinicCasesDate } from "./ClinicCasesDate";
import { ClinicCasesId } from "./ClinicCasesId";
import { ClinicCasesNumber } from "./ClinicCasesNumberClinicCasesNumber";
import { ClinicCasesTitle } from "./ClinicCasesTitle";
import { ClinicCasesURL } from "./ClinicCasesURL";
import { UserId } from "domain/User/UserId";


export class ClinicCases {
    id?: ClinicCasesId
    caseNumber?: ClinicCasesNumber
    title: ClinicCasesTitle
    beginningDate: ClinicCasesDate
    url: ClinicCasesURL
    patientId: PatientId
    userId: UserId

    constructor(title: string, beginningdate: string, url: string, patientId: string, userId: string, caseNumber?: string | undefined, id?: string | undefined){
        if(caseNumber) this.caseNumber = new ClinicCasesNumber(caseNumber)
        if(id) this.id = new ClinicCasesId(id) 
        this.title = new ClinicCasesTitle(title)
        this.beginningDate = new ClinicCasesDate(beginningdate)
        this.url = new ClinicCasesURL(url)
        this.patientId = new PatientId(patientId)
        this.userId = new UserId(userId)

    }

    toPrimitive(){
        return {
            id: this.id?.value,
            caseNumber: this.caseNumber?.value,
            title: this.title.value,
            beginningDate: this.beginningDate.value,
            url: this.url.value,
            patientId: this.patientId.value,
            userId: this.userId.value
        }
    }

}