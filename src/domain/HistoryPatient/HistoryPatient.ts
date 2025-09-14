import { PatientId } from "domain/Patient/PatientId";
import { UserId } from "domain/User/UserId";
import { HistoryPatientId } from "./HistoryPatientId";
import { removeUndefinedProperties } from "utils/removeUndefinedProperties";


type PatientObjt = {
    id?: string
    name?: string
    birthdate?: Date | string
    age?: number
    ci?: string
    phoneNumber?: number
    address?: string
    updatedAt?: Date
}

export class HistoryPatient {
    id?: HistoryPatientId
    patientId: PatientId
    userId: UserId
    changes: PatientSnapshot[] = []

    constructor(patientId: string, userId: string, changes: PatientSnapshot[] | PatientSnapshot, id?: string){
        this.patientId = new PatientId(patientId)
        this.userId = new UserId(userId)
        this.changes = Array.isArray(changes) ? this.changes.concat(changes) : this.changes.concat([changes])
        if(id) this.id = new HistoryPatientId(id)
    }

    

    addSnapshot(snapshot: PatientSnapshot){
        this.changes.push(snapshot)
    }

   

    toPrimitive(){
        return {
            id: this.id?.value,
            userId: this.userId.value,
            patientId: this.patientId.value,
            changes: this.changes.map(el => el.toPrimitive())
        }
    }
}


export class PatientSnapshot {
    id?: string
    name?: string
    birthdate?: Date | string
    age?: number
    ci?: string
    phoneNumber?: number
    address?: string
    updatedAt?: Date

    constructor(id?: string, name?: string, age?: number, birthdate?: Date | string, ci?: string, phoneNumber?: number, address?: string, updateAt?: Date){
        this.id = id
        this.birthdate = birthdate
        this.name = name
        this.age = age
        this.ci = ci
        this.phoneNumber = phoneNumber
        this.address = address
        this.updatedAt = updateAt
    }

    static buid(patientObjt: PatientObjt){
        return new PatientSnapshot(
            patientObjt.id, patientObjt.name, 
            patientObjt.age, patientObjt.birthdate, 
            patientObjt.ci, patientObjt.phoneNumber, 
            patientObjt.address
        )
    }

    toPrimitive(){
        return removeUndefinedProperties({
            id: this.id,
            name: this.name,
            age: this.age,
            birthdate: this.birthdate,
            ci: this.ci,
            phoneNumber: this.phoneNumber,
            address: this.address,
            updatedAt: this.updatedAt
        })
    }

    
}

 