import { PatientError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateIsNaN } from "utils/validateIsNaN";
import { validateNumberRange } from "utils/validateNumberRange";
import { validateType } from "utils/validateType";


export class PatientCI {
    value: string
    constructor(value: number | string){
        value = Number(value)
        validateExist(value, 'ci', PatientError)
        validateType(value, 'number', 'ci', PatientError)
        validateIsNaN(value, 'ci', PatientError)
        validateNumberRange(value, 99999, 99999999, 'ci', PatientError)
        this.value = value.toString()
    }

  
}