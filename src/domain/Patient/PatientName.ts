import { validateType } from "utils/validateType"
import { validateLength } from "utils/validateLength"
import { PatientError } from "Errors/Errors"
import { validateExist } from "utils/validateExist"

export class PatientName {

    constructor(public value: string){
        validateExist(this.value, 'name', PatientError)
        validateType(this.value, 'string', 'name', PatientError)
        validateLength(this.value, 1, 50, 'name', PatientError)
    }

}