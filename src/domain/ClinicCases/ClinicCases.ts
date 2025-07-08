import { PatientId } from "domain/Patient/PatientId";
import { ClinicCasesDate } from "./ClinicCasesDate";
import { ClinicCasesId } from "./ClinicCasesId";
import { ClinicCasesNumber } from "./ClinicCasesNumberClinicCasesNumber";
import { ClinicCasesTitle } from "./ClinicCasesTitle";
import { ClinicCasesURL } from "./ClinicCasesURL";


export class ClinicCases {
    id?: ClinicCasesId
    caseNumber?: ClinicCasesNumber
    title: ClinicCasesTitle
    beginningDate: ClinicCasesDate
    url: ClinicCasesURL
    patientId: PatientId

    constructor(title: string, beginningdate: string, url: string, patientId: string, caseNumber?: number | undefined, id?: string | undefined){
        if(caseNumber) this.caseNumber = new ClinicCasesNumber(caseNumber)
        if(id) this.id = new ClinicCasesId(id) 
        this.title = new ClinicCasesTitle(title)
        this.beginningDate = new ClinicCasesDate(beginningdate)
        this.url = new ClinicCasesURL(url)
        this.patientId = new PatientId(patientId)

    }
}