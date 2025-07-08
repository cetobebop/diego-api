import { UserId } from "domain/User/UserId";
import { PatientAddress } from "./PatientAddress";
import { PatientAge } from "./PatientAge";
import { PatientCI } from "./PatientCI";
import { PatientDate } from "./PatientDate";
import { PatientId } from "./PatientId";
import { PatientName } from "./PatientName";
import { PatientPhoneNumber } from "./PatientPhoneNumber";
import { PatientSex } from "./PatientSex";
import { ClinicCasesId } from "domain/ClinicCases/ClinicCasesId";
import { PatientStatus } from "./PatientStatus";

export class Patient {

    id?: PatientId
    name: PatientName
    birthdate: PatientDate
    ci: PatientCI
    phoneNumber: PatientPhoneNumber
    address: PatientAddress
    age: PatientAge
    sex: PatientSex
    beginningDate: PatientDate
    userId: UserId  
    clinicCasesIds?: ClinicCasesId[]
    status?: PatientStatus



    constructor(name: string, userId: string, birthdate: string, ci: string, phoneNumber: number, address: string, age: number, sex: string, beginningDate: string, id?: PatientId, clinicCasesIds?: ClinicCasesId[], status?: PatientStatus){
        this.name = new PatientName(name)
        this.userId = new UserId(userId)
        this.birthdate = new PatientDate(birthdate)
        this.ci = new PatientCI(ci)
        this.phoneNumber = new PatientPhoneNumber(phoneNumber)
        this.address = new PatientAddress(address)
        this.age = new PatientAge(age)
        this.sex = new PatientSex(sex)
        this.beginningDate = new PatientDate(beginningDate)
        this.id = id
        this.clinicCasesIds = clinicCasesIds
        this.status = status
    }


    getClinicCasesIdString(){
        if(!this.clinicCasesIds?.length) return []
        
        return this.clinicCasesIds.map(clinicCase => clinicCase.value)
    }

    getPatient(){
        return ({
                    id: this.id?.value,
                    name: this.name.value,
                    ci: this.ci.value,
                    phoneNumber: this.phoneNumber.value,
                    beginninDate :this.beginningDate.value,
                    birthdate: this.birthdate.value,
                    sex: this.sex.value,
                    address: this.address.value,
                    clinicCasesId: this.getClinicCasesIdString(),
                    status: this.status?.value,
                    age: this.age.value
                })
        
    }

}