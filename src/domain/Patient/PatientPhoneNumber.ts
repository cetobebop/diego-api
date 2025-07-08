import { PatientError } from "Errors/Errors"
import { validateExist } from "utils/validateExist"
import { validateNumberRange } from "utils/validateNumberRange"
import { validateType } from "utils/validateType"


export class PatientPhoneNumber {

    constructor(public value: number){
        validateExist(this.value, 'phone', PatientError)
        validateType(this.value, 'number', 'phone', PatientError)
        validateNumberRange(this.value, 9999999, 999999999999999, 'phone', PatientError)
    }

   
}