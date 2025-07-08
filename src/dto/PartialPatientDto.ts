import { PatientAddress } from "domain/Patient/PatientAddress"
import { PatientAge } from "domain/Patient/PatientAge"
import { PatientCI } from "domain/Patient/PatientCI"
import { PatientDate } from "domain/Patient/PatientDate"
import { PatientName } from "domain/Patient/PatientName"
import { PatientPhoneNumber } from "domain/Patient/PatientPhoneNumber"
import { removeUndefinedProperties } from "utils/removeUndefinedProperties"



type PatientRaw = {
    name?: string,
    birthdate?: string 
    ci?: number 
    phoneNumber?: number
    address?: string
    age?: number
}

export class PartialPatientDto {
    name?: PatientName
    birthdate?: PatientDate 
    ci?: PatientCI 
    phoneNumber?: PatientPhoneNumber
    address?: PatientAddress
    age?: PatientAge


    private constructor(
        partialUser: {
            name?: PatientName,
            birthdate?: PatientDate,
            ci?: PatientCI,
            phoneNumber?: PatientPhoneNumber,
            address?: PatientAddress,
            age?: PatientAge
        }
    ){

        
        Object.assign(this, partialUser)
    }

    public static create(patient: PatientRaw){

        const name = patient.name ? new PatientName(patient.name) : undefined
        const ci = patient.ci ? new PatientCI(patient.ci) : undefined
        const birthdate = patient.birthdate ? new PatientDate(patient.birthdate) : undefined
        const phoneNumber = patient.phoneNumber ? new PatientPhoneNumber(patient.phoneNumber) : undefined
        const address = patient.address ? new PatientAddress(patient.address) : undefined
        const age = patient.age ? new PatientAge(patient.age) : undefined

        const patientProps = removeUndefinedProperties({
            name,
            ci,
            birthdate,
            phoneNumber,
            address,
            age
        })

        return new PartialPatientDto(patientProps)
    }


    toPrimitive(){
        return removeUndefinedProperties({
            name: this.name,
            birthdate: this.birthdate,
            phoneNumber: this.phoneNumber,
            ci: this.ci,
            age: this.age,
            address: this.address
        })
    }

}